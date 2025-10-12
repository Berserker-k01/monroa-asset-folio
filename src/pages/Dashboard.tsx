import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { isDemoMode, getDemoAssets } from "@/lib/demoMode";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Plus, Package } from "lucide-react";
import { Asset, ASSET_STATUSES } from "@/lib/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

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
        setStatsLoading(false);
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
    } finally {
      setStatsLoading(false);
    }
  };

  if (loading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalValue = assets.reduce((sum, asset) => sum + Number(asset.estimated_value), 0);
  
  const stats = [
    {
      title: "Total des biens",
      value: assets.length,
      icon: Package,
      description: "Biens enregistrés",
      color: "text-primary",
    },
    {
      title: "Valeur totale",
      value: `${totalValue.toLocaleString('fr-FR')} F CFA`,
      icon: TrendingUp,
      description: "Valeur estimée",
      color: "text-accent",
    },
  ];

  const statusStats = ASSET_STATUSES.map(status => ({
    ...status,
    count: assets.filter(a => a.status === status.value).length,
  }));

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre patrimoine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}

          <Card className="hover-lift cursor-pointer" onClick={() => navigate('/add-asset')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ajouter un bien
              </CardTitle>
              <Plus className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+</div>
              <p className="text-xs text-muted-foreground mt-1">
                Nouveau bien
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Statuts des biens</CardTitle>
            <CardDescription>
              Répartition par statut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusStats.map((status) => (
                <div key={status.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{status.icon}</span>
                    <span className="font-medium">{status.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold">{status.count}</span>
                    <div 
                      className="w-24 h-2 rounded-full bg-muted overflow-hidden"
                    >
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${assets.length > 0 ? (status.count / assets.length) * 100 : 0}%`,
                          backgroundColor: status.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {assets.length === 0 && (
          <Card className="mt-8 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun bien enregistré</h3>
              <p className="text-muted-foreground text-center mb-4">
                Commencez par ajouter votre premier bien
              </p>
              <Button onClick={() => navigate('/add-asset')}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un bien
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;