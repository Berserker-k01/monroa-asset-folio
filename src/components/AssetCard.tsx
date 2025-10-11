import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, MapPin, Calendar } from "lucide-react";
import { Asset, ASSET_TYPES } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface AssetCardProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

const AssetCard = ({ asset, onEdit, onDelete }: AssetCardProps) => {
  const typeInfo = ASSET_TYPES.find(t => t.value === asset.type);
  const formattedDate = new Date(asset.created_at).toLocaleDateString('fr-FR');

  return (
    <Card className="overflow-hidden hover-lift">
      {asset.images.length > 0 && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img 
            src={asset.images[0]} 
            alt={asset.name}
            className="w-full h-full object-cover"
          />
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
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Valeur estimée</span>
          <span className="font-bold text-lg text-primary">
            {Number(asset.estimated_value).toLocaleString('fr-FR')} F CFA
          </span>
        </div>

        {asset.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {asset.description}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <Calendar className="h-3 w-3" />
          <span>Ajouté le {formattedDate}</span>
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(asset)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Modifier
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={() => onDelete(asset.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssetCard;