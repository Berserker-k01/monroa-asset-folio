import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { isDemoMode, getDemoAssets } from "@/lib/demoMode";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Store, TrendingUp, Eye, FileText, Download, 
  DollarSign, Calendar, User, AlertCircle 
} from "lucide-react";
import { Asset, Transaction, RentalPayment } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import StatusBadge from "@/components/StatusBadge";

const MySales = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [myListings, setMyListings] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [rentals, setRentals] = useState<RentalPayment[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchMyData();
    }
  }, [user]);

  const fetchMyData = async () => {
    try {
      if (isDemoMode()) {
        const demoAssets = getDemoAssets();
        const myAssets = demoAssets.filter(a => a.is_on_marketplace);
        setMyListings(myAssets);
        setDataLoading(false);
        return;
      }

      // Fetch my marketplace listings
      const { data: listings, error: listingsError } = await supabase
        .from('assets')
        .select('*')
        .eq('user_id', user!.id)
        .eq('is_on_marketplace', true)
        .order('created_at', { ascending: false });

      if (listingsError) throw listingsError;
      setMyListings(listings || []);

      // Fetch transactions where I'm the seller
      const { data: txns, error: txnsError } = await supabase
        .from('transactions')
        .select('*, assets(*)')
        .eq('seller_id', user!.id)
        .order('created_at', { ascending: false });

      if (txnsError) throw txnsError;
      setTransactions(txns || []);

      // Fetch rental payments where I'm the landlord
      const { data: payments, error: paymentsError } = await supabase
        .from('rental_payments')
        .select('*, assets(*)')
        .eq('landlord_id', user!.id)
        .order('due_date', { ascending: false });

      if (paymentsError) throw paymentsError;
      setRentals(payments || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger vos données",
        variant: "destructive",
      });
    } finally {
      setDataLoading(false);
    }
  };

  const generateReceipt = (payment: RentalPayment) => {
    toast({
      title: "Reçu généré ! 📄",
      description: "Le reçu a été généré et envoyé",
    });
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = {
    totalListings: myListings.length,
    activeListings: myListings.filter(a => a.status === 'en_vente' || a.status === 'en_bail').length,
    totalTransactions: transactions.length,
    pendingPayments: rentals.filter(r => r.status === 'en_attente').length,
    overduePayments: rentals.filter(r => r.status === 'en_retard').length,
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              Mes Ventes & Locations
            </h1>
          </div>
          <p className="text-muted-foreground">
            Gérez vos biens mis en vente, location ou bail
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                Total Annonces
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalListings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                Actives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.activeListings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-secondary" />
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.totalTransactions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                En attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                En retard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.overduePayments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">Mes Annonces</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="rentals">Loyers</TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-4">
            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map((asset) => (
                  <Card key={asset.id} className="overflow-hidden hover-lift">
                    {asset.images && asset.images.length > 0 && (
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img 
                          src={asset.images[0]} 
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="line-clamp-1">{asset.name}</CardTitle>
                          <CardDescription>{asset.location}</CardDescription>
                        </div>
                        <StatusBadge status={asset.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {asset.sale_price && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Prix vente</span>
                          <span className="font-semibold">{asset.sale_price.toLocaleString('fr-FR')} F</span>
                        </div>
                      )}
                      {asset.rental_price_monthly && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Loyer/mois</span>
                          <span className="font-semibold">{asset.rental_price_monthly.toLocaleString('fr-FR')} F</span>
                        </div>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate(`/marketplace/${asset.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Voir l'annonce
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Store className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune annonce</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Vous n'avez pas encore mis de biens sur le marketplace
                  </p>
                  <Button onClick={() => navigate('/add-asset')}>
                    Créer une annonce
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((txn) => (
                  <Card key={txn.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Transaction #{txn.id.substring(0, 8)}</CardTitle>
                          <CardDescription>
                            {new Date(txn.created_at).toLocaleDateString('fr-FR')}
                          </CardDescription>
                        </div>
                        <Badge variant={
                          txn.status === 'completee' ? 'default' :
                          txn.status === 'en_attente' ? 'secondary' : 'destructive'
                        }>
                          {txn.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-semibold capitalize">{txn.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Montant</span>
                        <span className="font-bold text-primary">
                          {txn.amount.toLocaleString('fr-FR')} F CFA
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune transaction</h3>
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore de transactions
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Rentals/Payments Tab */}
          <TabsContent value="rentals" className="space-y-4">
            {rentals.length > 0 ? (
              <div className="space-y-4">
                {rentals.map((payment) => (
                  <Card key={payment.id} className={payment.status === 'en_retard' ? 'border-destructive' : ''}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Échéance : {new Date(payment.due_date).toLocaleDateString('fr-FR')}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <User className="h-3 w-3" />
                            Locataire: {payment.tenant_id.substring(0, 8)}...
                          </CardDescription>
                        </div>
                        <Badge variant={
                          payment.status === 'paye' ? 'default' :
                          payment.status === 'en_retard' ? 'destructive' : 'secondary'
                        }>
                          {payment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Montant</span>
                        <span className="text-2xl font-bold text-primary">
                          {payment.amount.toLocaleString('fr-FR')} F CFA
                        </span>
                      </div>
                      {payment.paid_date && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Payé le</span>
                          <span className="text-sm font-medium">
                            {new Date(payment.paid_date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2">
                        {payment.status === 'paye' && (
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => generateReceipt(payment)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger reçu
                          </Button>
                        )}
                        {payment.status === 'en_retard' && (
                          <Button 
                            variant="destructive" 
                            className="flex-1"
                            onClick={() => {
                              toast({
                                title: "Rappel envoyé",
                                description: "Un rappel a été envoyé au locataire",
                              });
                            }}
                          >
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Envoyer rappel
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun loyer</h3>
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore de paiements de loyers
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MySales;

