import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { isDemoMode, getDemoAssets } from "@/lib/demoMode";
import Navigation from "@/components/Navigation";
import MapView from "@/components/MapView";
import { Asset } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Map as MapIcon } from "lucide-react";

const MapPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(true);

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

  const handleAssetClick = (asset: Asset) => {
    navigate('/assets', { state: { selectedAssetId: asset.id } });
  };

  if (loading || assetsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const assetsWithCoords = assets.filter(a => a.latitude && a.longitude);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <MapIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              Carte des biens
            </h1>
          </div>
          <p className="text-muted-foreground">
            Visualisez tous vos biens géolocalisés sur une carte interactive
          </p>
          {assetsWithCoords.length > 0 && (
            <p className="text-sm text-primary mt-1">
              {assetsWithCoords.length} bien{assetsWithCoords.length !== 1 ? 's' : ''} géolocalisé{assetsWithCoords.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <MapView assets={assets} onAssetClick={handleAssetClick} />

        {assets.length > 0 && assetsWithCoords.length === 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground text-center">
              💡 <strong>Astuce :</strong> Ajoutez des coordonnées GPS lors de la création ou modification de vos biens pour les voir apparaître sur la carte
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MapPage;

