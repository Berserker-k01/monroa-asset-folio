-- Add marketplace fields to assets table
ALTER TABLE public.assets 
ADD COLUMN IF NOT EXISTS is_on_marketplace boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS sale_price numeric,
ADD COLUMN IF NOT EXISTS rental_price_monthly numeric,
ADD COLUMN IF NOT EXISTS lease_price numeric,
ADD COLUMN IF NOT EXISTS bedrooms integer,
ADD COLUMN IF NOT EXISTS bathrooms integer,
ADD COLUMN IF NOT EXISTS surface_area numeric,
ADD COLUMN IF NOT EXISTS year_built integer,
ADD COLUMN IF NOT EXISTS features text[];

-- Update asset_status enum to include new statuses
ALTER TYPE public.asset_status ADD VALUE IF NOT EXISTS 'en_vente';
ALTER TYPE public.asset_status ADD VALUE IF NOT EXISTS 'en_bail';

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid REFERENCES public.assets(id) ON DELETE CASCADE NOT NULL,
  buyer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  seller_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('achat', 'location', 'bail')),
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'completee', 'annulee')),
  created_at timestamptz DEFAULT now() NOT NULL,
  completed_at timestamptz
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can create transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Sellers can update transactions"
  ON public.transactions FOR UPDATE
  USING (auth.uid() = seller_id);

-- Create rental_payments table
CREATE TABLE IF NOT EXISTS public.rental_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid REFERENCES public.assets(id) ON DELETE CASCADE NOT NULL,
  tenant_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  landlord_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  due_date date NOT NULL,
  paid_date timestamptz,
  status text NOT NULL DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'paye', 'en_retard', 'annule')),
  receipt_url text,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.rental_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own rental payments"
  ON public.rental_payments FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() = landlord_id);

CREATE POLICY "Landlords can create rental payments"
  ON public.rental_payments FOR INSERT
  WITH CHECK (auth.uid() = landlord_id);

CREATE POLICY "Tenants and landlords can update rental payments"
  ON public.rental_payments FOR UPDATE
  USING (auth.uid() = tenant_id OR auth.uid() = landlord_id);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('loyer_du', 'loyer_retard', 'nouvelle_transaction', 'paiement_recu')),
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false NOT NULL,
  asset_id uuid REFERENCES public.assets(id) ON DELETE SET NULL,
  payment_id uuid REFERENCES public.rental_payments(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_buyer ON public.transactions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_seller ON public.transactions(seller_id);
CREATE INDEX IF NOT EXISTS idx_transactions_asset ON public.transactions(asset_id);
CREATE INDEX IF NOT EXISTS idx_rental_payments_tenant ON public.rental_payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_rental_payments_landlord ON public.rental_payments(landlord_id);
CREATE INDEX IF NOT EXISTS idx_rental_payments_due_date ON public.rental_payments(due_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);
CREATE INDEX IF NOT EXISTS idx_assets_marketplace ON public.assets(is_on_marketplace) WHERE is_on_marketplace = true;

-- Function to automatically mark overdue payments
CREATE OR REPLACE FUNCTION public.mark_overdue_payments()
RETURNS void AS $$
BEGIN
  UPDATE public.rental_payments
  SET status = 'en_retard'
  WHERE status = 'en_attente'
    AND due_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notification for overdue payment
CREATE OR REPLACE FUNCTION public.notify_overdue_payment()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'en_retard' AND OLD.status = 'en_attente' THEN
    INSERT INTO public.notifications (user_id, type, title, message, asset_id, payment_id)
    VALUES (
      NEW.tenant_id,
      'loyer_retard',
      'Loyer en retard',
      'Votre paiement de loyer est en retard. Montant dû: ' || NEW.amount || ' F CFA',
      NEW.asset_id,
      NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_notify_overdue_payment
  AFTER UPDATE ON public.rental_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_overdue_payment();

-- Comments
COMMENT ON TABLE public.transactions IS 'Store all property transactions (purchase, rental, lease)';
COMMENT ON TABLE public.rental_payments IS 'Track rental payments and their status';
COMMENT ON TABLE public.notifications IS 'User notifications for payments and transactions';

