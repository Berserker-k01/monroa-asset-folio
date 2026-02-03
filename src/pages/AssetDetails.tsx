import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { isDemoMode, getDemoAssets } from "@/lib/demoMode";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, MapPin, Home, Bed, Bath, Maximize, Calendar, 
  ShoppingCart, Key, FileText, User, Phone, Mail
} from "lucide-react";
import { Asset, ASSET_TYPES, Transaction } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import StatusBadge from "@/components/StatusBadge";
import { getGoogleMapsUrl } from "@/lib/coordinates";

const AssetDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [asset, setAsset] = useState<Asset | null>(location.state?.asset || null);
  const [assetLoading, setAssetLoading] = useState(!asset);
  const [transactionDialogOpen, setTransactionDialogOpen] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState<'achat' | 'location' | 'bail'>('achat');

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!asset && id) {
      fetchAsset();
    }
  }, [id, asset]);

  const fetchAsset = async () => {
    try {
      if (isDemoMode()) {
        const demoAssets = getDemoAssets();
        const found = demoAssets.find(a => a.id === id);
        if (found) {
          setAsset(found);
        }
        setAssetLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setAsset(data);
    } catch (error) {
      console.error('Error fetching asset:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le bien",
        variant: "destructive",
      });
      navigate('/marketplace');
    } finally {
      setAssetLoading(false);
    }
  };

  const handleTransaction = async (type: 'achat' | 'location' | 'bail') => {
    if (!asset || !user) return;

    const amount = type === 'achat' ? asset.sale_price : 
                   type === 'location' ? asset.rental_price_monthly :
                   asset.lease_price;

    if (!amount) {
      toast({
        title: "Erreur",
        description: "Prix non disponible pour ce type de transaction",
        variant: "destructive",
      });
      return;
    }

    try {
      // In demo mode or real mode, create transaction
      if (isDemoMode()) {
        toast({
          title: "Transaction initiée ! 🎉",
          description: `Votre ${type} de ${amount.toLocaleString('fr-FR')} F CFA est en cours de traitement.`,
        });
        setTransactionDialogOpen(false);
        return;
      }

      const transaction: Partial<Transaction> = {
        asset_id: asset.id,
        buyer_id: user.id,
        seller_id: asset.user_id,
        type: type,
        amount: amount,
        status: 'en_attente',
      };

      const { error } = await supabase
        .from('transactions')
        .insert([transaction]);

      if (error) throw error;

      toast({
        title: "Transaction initiée ! 🎉",
        description: `Votre demande de ${type} a été envoyée au propriétaire.`,
      });
      
      setTransactionDialogOpen(false);
    } catch (error: any) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer la transaction",
        variant: "destructive",
      });
    }
  };

  if (loading || assetLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bien non trouvé</h2>
          <Button onClick={() => navigate('/marketplace')}>
            Retour au Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const typeInfo = ASSET_TYPES.find(t => t.value === asset.type);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Images and details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            {asset.images && asset.images.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {asset.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={image} 
                          alt={`${asset.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {asset.images.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Home className="h-24 w-24 text-muted-foreground" />
              </div>
            )}

            {/* Property Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{asset.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4" />
                      {asset.location}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="secondary">{typeInfo?.label || asset.type}</Badge>
                    <StatusBadge status={asset.status} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main specs */}
                {(asset.bedrooms || asset.bathrooms || asset.surface_area) && (
                  <div className="flex items-center gap-6">
                    {asset.bedrooms && (
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">{asset.bedrooms}</div>
                          <div className="text-xs text-muted-foreground">Chambres</div>
                        </div>
                      </div>
                    )}
                    {asset.bathrooms && (
                      <div className="flex items-center gap-2">
                        <Bath className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">{asset.bathrooms}</div>
                          <div className="text-xs text-muted-foreground">Salles de bain</div>
                        </div>
                      </div>
                    )}
                    {asset.surface_area && (
                      <div className="flex items-center gap-2">
                        <Maximize className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold">{asset.surface_area}m²</div>
                          <div className="text-xs text-muted-foreground">Surface</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <Separator />

                {/* Description */}
                {asset.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{asset.description}</p>
                  </div>
                )}

                {/* Features */}
                {asset.features && asset.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Caractéristiques</h3>
                    <div className="flex flex-wrap gap-2">
                      {asset.features.map((feature, index) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional info */}
                <div className="grid grid-cols-2 gap-4">
                  {asset.year_built && (
                    <div>
                      <div className="text-sm text-muted-foreground">Année de construction</div>
                      <div className="font-semibold">{asset.year_built}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-muted-foreground">Valeur estimée</div>
                    <div className="font-semibold">{asset.estimated_value.toLocaleString('fr-FR')} F CFA</div>
                  </div>
                </div>

                {/* Map link */}
                {asset.latitude && asset.longitude && (
                  <div>
                    <a
                      href={getGoogleMapsUrl(asset.latitude, asset.longitude)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Voir sur Google Maps
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column - Pricing and actions */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Prix et disponibilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sale price */}
                {asset.sale_price && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      <span className="font-semibold">À vendre</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {asset.sale_price.toLocaleString('fr-FR')} F CFA
                    </div>
                    <Button 
                      className="w-full mt-3"
                      onClick={() => {
                        setSelectedTransactionType('achat');
                        setTransactionDialogOpen(true);
                      }}
                    >
                      Acheter
                    </Button>
                  </div>
                )}

                {/* Rental price */}
                {asset.rental_price_monthly && (
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="h-5 w-5 text-accent" />
                      <span className="font-semibold">À louer</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      {asset.rental_price_monthly.toLocaleString('fr-FR')} F CFA
                    </div>
                    <div className="text-sm text-muted-foreground">par mois</div>
                    <Button 
                      className="w-full mt-3"
                      variant="secondary"
                      onClick={() => {
                        setSelectedTransactionType('location');
                        setTransactionDialogOpen(true);
                      }}
                    >
                      Louer
                    </Button>
                  </div>
                )}

                {/* Lease price */}
                {asset.lease_price && (
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-secondary" />
                      <span className="font-semibold">En bail</span>
                    </div>
                    <div className="text-2xl font-bold text-secondary">
                      {asset.lease_price.toLocaleString('fr-FR')} F CFA
                    </div>
                    <Button 
                      className="w-full mt-3"
                      variant="outline"
                      onClick={() => {
                        setSelectedTransactionType('bail');
                        setTransactionDialogOpen(true);
                      }}
                    >
                      Prendre en bail
                    </Button>
                  </div>
                )}

                <Separator />

                {/* Contact info */}
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Contacter le propriétaire
                  </h3>
                  <Button variant="outline" className="w-full" disabled>
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction Dialog */}
        <Dialog open={transactionDialogOpen} onOpenChange={setTransactionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Confirmer la transaction
              </DialogTitle>
              <DialogDescription>
                Vous êtes sur le point de{' '}
                {selectedTransactionType === 'achat' ? 'acheter' : 
                 selectedTransactionType === 'location' ? 'louer' : 
                 'prendre en bail'} ce bien.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bien</span>
                <span className="font-semibold">{asset.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Montant</span>
                <span className="text-2xl font-bold text-primary">
                  {(selectedTransactionType === 'achat' ? asset.sale_price : 
                    selectedTransactionType === 'location' ? asset.rental_price_monthly :
                    asset.lease_price)?.toLocaleString('fr-FR')} F CFA
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setTransactionDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => handleTransaction(selectedTransactionType)}>
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AssetDetails;

