import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { isDemoMode, addDemoAsset, updateDemoAsset } from "@/lib/demoMode";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ASSET_TYPES, ASSET_STATUSES, Asset, AssetType, AssetStatus } from "@/lib/types";
import { isValidCoordinate, getGoogleMapsUrl } from "@/lib/coordinates";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";

const AddEditAsset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  const editingAsset = location.state?.asset as Asset | undefined;
  const isEditing = !!editingAsset;

  const [formData, setFormData] = useState({
    name: editingAsset?.name || "",
    type: editingAsset?.type || ("maison" as AssetType),
    location: editingAsset?.location || "",
    latitude: editingAsset?.latitude?.toString() || "",
    longitude: editingAsset?.longitude?.toString() || "",
    estimated_value: editingAsset?.estimated_value?.toString() || "",
    status: editingAsset?.status || ("disponible" as AssetStatus),
    description: editingAsset?.description || "",
    images: editingAsset?.images || [],
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);

    try {
      const assetData = {
        name: formData.name,
        type: formData.type,
        location: formData.location,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        estimated_value: parseFloat(formData.estimated_value),
        status: formData.status,
        description: formData.description || null,
        images: formData.images,
        user_id: user.id,
      };

      // Use demo mode if active
      if (isDemoMode()) {
        if (isEditing) {
          updateDemoAsset(editingAsset.id, assetData as Partial<Asset>);
          toast({
            title: "Bien modifié",
            description: "Le bien a été mis à jour avec succès",
          });
        } else {
          addDemoAsset(assetData as Asset);
          toast({
            title: "Bien ajouté",
            description: "Le bien a été ajouté avec succès ✨",
          });
        }
        navigate('/assets');
        return;
      }

      if (isEditing) {
        const { error } = await supabase
          .from('assets')
          .update(assetData)
          .eq('id', editingAsset.id);

        if (error) throw error;

        toast({
          title: "Bien modifié",
          description: "Le bien a été mis à jour avec succès",
        });
      } else {
        const { error } = await supabase
          .from('assets')
          .insert([assetData]);

        if (error) throw error;

        toast({
          title: "Bien ajouté",
          description: "Le bien a été ajouté avec succès ✨",
        });
      }

      navigate('/assets');
    } catch (error: any) {
      console.error('Error saving asset:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
            {isEditing ? "Modifier le bien" : "Ajouter un bien"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Mettez à jour les informations de votre bien" : "Remplissez les informations de votre nouveau bien"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations du bien</CardTitle>
            <CardDescription>
              Tous les champs marqués d'un * sont obligatoires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du bien *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Villa à Lomé"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: AssetType) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSET_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: AssetStatus) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSET_STATUSES.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.icon} {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Lomé, Tokoin"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude (optionnel)</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    placeholder="Ex: 6.1256"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude (optionnel)</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    placeholder="Ex: 1.2223"
                  />
                </div>
              </div>

              {formData.latitude && formData.longitude && (
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-md border border-primary/20">
                  {isValidCoordinate(parseFloat(formData.latitude), parseFloat(formData.longitude)) ? (
                    <>
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Coordonnées valides</span>
                      <a
                        href={getGoogleMapsUrl(parseFloat(formData.latitude), parseFloat(formData.longitude))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Vérifier sur Maps
                      </a>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">Coordonnées invalides</span>
                    </>
                  )}
                </div>
              )}

              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md space-y-1">
                <p>
                  💡 <strong>Astuce :</strong> Pour obtenir les coordonnées GPS, utilisez{" "}
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Maps
                  </a>
                  {" "}(clic droit sur un emplacement → voir les coordonnées)
                </p>
                <p>
                  📍 <strong>Exemples :</strong> Lomé centre (6.1319, 1.2228), Tokoin (6.1520, 1.2362)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated_value">Valeur estimée (F CFA) *</Label>
                <Input
                  id="estimated_value"
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.estimated_value}
                  onChange={(e) => setFormData({ ...formData, estimated_value: e.target.value })}
                  placeholder="Ex: 50000000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez votre bien..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? "Enregistrement..." : isEditing ? "Mettre à jour" : "Ajouter"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddEditAsset;