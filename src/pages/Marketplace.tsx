import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { isDemoMode, getDemoAssets } from "@/lib/demoMode";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ShoppingCart, Home, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Asset, ASSET_TYPES, AssetType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import StatusBadge from "@/components/StatusBadge";

const Marketplace = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [transactionType, setTransactionType] = useState<string>("all"); // achat, location, bail
  const [assetsLoading, setAssetsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchMarketplaceAssets();
    }
  }, [user]);

  useEffect(() => {
    filterAssets();
  }, [assets, searchQuery, typeFilter, transactionType]);

  const fetchMarketplaceAssets = async () => {
    try {
      if (isDemoMode()) {
        const demoAssets = getDemoAssets();
        // Filter only marketplace assets
        const marketplaceAssets = demoAssets.filter(a => 
          a.is_on_marketplace || a.status === 'en_vente' || a.status === 'en_bail'
        );
        setAssets(marketplaceAssets);
        setAssetsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('is_on_marketplace', true)
        .neq('user_id', user!.id) // Exclure ses propres biens
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching marketplace assets:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les biens du marketplace",
        variant: "destructive",
      });
    } finally {
      setAssetsLoading(false);
    }
  };

  const filterAssets = () => {
    let filtered = [...assets];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(query) ||
        asset.location.toLowerCase().includes(query) ||
        asset.type.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(asset => asset.type === typeFilter);
    }

    // Transaction type filter
    if (transactionType === "achat") {
      filtered = filtered.filter(asset => asset.status === 'en_vente' || asset.sale_price);
    } else if (transactionType === "location") {
      filtered = filtered.filter(asset => asset.rental_price_monthly);
    } else if (transactionType === "bail") {
      filtered = filtered.filter(asset => asset.status === 'en_bail' || asset.lease_price);
    }

    setFilteredAssets(filtered);
  };

  const handleViewAsset = (asset: Asset) => {
    navigate(`/marketplace/${asset.id}`, { state: { asset } });
  };

  if (loading || assetsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              Marketplace
            </h1>
          </div>
          <p className="text-muted-foreground">
            Découvrez les biens disponibles à l'achat, à la location ou en bail
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Filtres</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un bien..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type de bien" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {ASSET_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="achat">💰 À vendre</SelectItem>
                <SelectItem value="location">🏠 À louer</SelectItem>
                <SelectItem value="bail">📄 En bail</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setTypeFilter("all");
              setTransactionType("all");
            }}>
              Réinitialiser
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredAssets.length} bien{filteredAssets.length !== 1 ? 's' : ''} trouvé{filteredAssets.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Assets grid */}
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => {
              const typeInfo = ASSET_TYPES.find(t => t.value === asset.type);
              
              return (
                <Card key={asset.id} className="overflow-hidden hover-lift cursor-pointer" onClick={() => handleViewAsset(asset)}>
                  {asset.images && asset.images.length > 0 ? (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img 
                        src={asset.images[0]} 
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <Home className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-secondary line-clamp-1">
                          {asset.name}
                        </h3>
                        <Badge variant="secondary" className="mt-2">
                          {typeInfo?.label || asset.type}
                        </Badge>
                      </div>
                      <StatusBadge status={asset.status} />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{asset.location}</span>
                    </div>

                    {/* Property details */}
                    {(asset.bedrooms || asset.bathrooms || asset.surface_area) && (
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {asset.bedrooms && (
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>{asset.bedrooms}</span>
                          </div>
                        )}
                        {asset.bathrooms && (
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>{asset.bathrooms}</span>
                          </div>
                        )}
                        {asset.surface_area && (
                          <div className="flex items-center gap-1">
                            <Maximize className="h-4 w-4" />
                            <span>{asset.surface_area}m²</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Prices */}
                    <div className="space-y-1">
                      {asset.sale_price && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Prix de vente</span>
                          <span className="font-bold text-primary">
                            {asset.sale_price.toLocaleString('fr-FR')} F CFA
                          </span>
                        </div>
                      )}
                      {asset.rental_price_monthly && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Loyer mensuel</span>
                          <span className="font-bold text-accent">
                            {asset.rental_price_monthly.toLocaleString('fr-FR')} F CFA/mois
                          </span>
                        </div>
                      )}
                      {asset.lease_price && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Prix du bail</span>
                          <span className="font-bold text-secondary">
                            {asset.lease_price.toLocaleString('fr-FR')} F CFA
                          </span>
                        </div>
                      )}
                    </div>

                    {asset.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {asset.description}
                      </p>
                    )}
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button className="w-full" onClick={() => handleViewAsset(asset)}>
                      Voir le bien
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Aucun bien trouvé
            </h3>
            <p className="text-muted-foreground mb-4">
              Essayez de modifier vos filtres ou revenez plus tard
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;

