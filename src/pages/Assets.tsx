import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { isDemoMode, getDemoAssets, deleteDemoAsset } from "@/lib/demoMode";
import Navigation from "@/components/Navigation";
import AssetCard from "@/components/AssetCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Building2 } from "lucide-react";
import { Asset, ASSET_TYPES, ASSET_STATUSES, AssetType, AssetStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Assets = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assetsLoading, setAssetsLoading] = useState(true);
  const [deleteAssetId, setDeleteAssetId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAssets();
    }
  }, [user]);

  useEffect(() => {
    filterAssets();
  }, [assets, searchQuery, typeFilter, statusFilter]);

  const fetchAssets = async () => {
    try {
      // Use demo data if in demo mode
      if (isDemoMode()) {
        const demoAssets = getDemoAssets();
        setAssets(demoAssets);
        setAssetsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les biens",
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

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(asset => asset.status === statusFilter);
    }

    setFilteredAssets(filtered);
  };

  const handleDelete = async () => {
    if (!deleteAssetId) return;

    try {
      // Use demo mode if active
      if (isDemoMode()) {
        deleteDemoAsset(deleteAssetId);
        toast({
          title: "Bien supprimé",
          description: "Le bien a été supprimé avec succès",
        });
        setAssets(assets.filter(a => a.id !== deleteAssetId));
        setDeleteAssetId(null);
        return;
      }

      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', deleteAssetId);

      if (error) throw error;

      toast({
        title: "Bien supprimé",
        description: "Le bien a été supprimé avec succès",
      });

      setAssets(assets.filter(a => a.id !== deleteAssetId));
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le bien",
        variant: "destructive",
      });
    } finally {
      setDeleteAssetId(null);
    }
  };

  const handleEdit = (asset: Asset) => {
    navigate('/add-asset', { state: { asset } });
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
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
            Mes biens
          </h1>
          <p className="text-muted-foreground">
            Gérez tous vos biens en un seul endroit
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Filtres</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {ASSET_STATUSES.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.icon} {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onEdit={handleEdit}
                onDelete={setDeleteAssetId}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery || typeFilter !== "all" || statusFilter !== "all" 
                ? "Aucun bien trouvé" 
                : "Aucun bien enregistré"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || typeFilter !== "all" || statusFilter !== "all"
                ? "Essayez de modifier vos filtres"
                : "Commencez par ajouter votre premier bien"}
            </p>
            {!(searchQuery || typeFilter !== "all" || statusFilter !== "all") && (
              <Button onClick={() => navigate('/add-asset')}>
                Ajouter un bien
              </Button>
            )}
          </div>
        )}
      </main>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteAssetId} onOpenChange={() => setDeleteAssetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le bien sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Assets;