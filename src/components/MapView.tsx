import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Asset, ASSET_TYPES, ASSET_STATUSES } from '@/lib/types';
import { getGoogleMapsUrl, formatCoordinates } from '@/lib/coordinates';
import { MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapViewProps {
  assets: Asset[];
  onAssetClick?: (asset: Asset) => void;
}

// Component to fit map bounds to markers
const MapBounds = ({ assets }: { assets: Asset[] }) => {
  const map = useMap();

  useEffect(() => {
    const assetsWithCoords = assets.filter(a => a.latitude && a.longitude);
    if (assetsWithCoords.length > 0) {
      const bounds = L.latLngBounds(
        assetsWithCoords.map(a => [a.latitude!, a.longitude!])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [assets, map]);

  return null;
};

const MapView = ({ assets, onAssetClick }: MapViewProps) => {
  const assetsWithCoords = assets.filter(a => a.latitude && a.longitude);

  // Default center (Lomé, Togo as example)
  const defaultCenter: [number, number] = [6.1256, 1.2223];
  
  if (assetsWithCoords.length === 0) {
    return (
      <div className="w-full h-[500px] rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-3">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Aucune propriété géolocalisée</h3>
            <p className="text-sm text-muted-foreground">
              Ajoutez des coordonnées GPS à vos biens pour les voir sur la carte
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border shadow-sm">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds assets={assetsWithCoords} />
        {assetsWithCoords.map((asset) => {
          const typeInfo = ASSET_TYPES.find(t => t.value === asset.type);
          const statusInfo = ASSET_STATUSES.find(s => s.value === asset.status);
          
          return (
            <Marker
              key={asset.id}
              position={[asset.latitude!, asset.longitude!]}
              eventHandlers={{
                click: () => onAssetClick?.(asset),
              }}
            >
              <Popup>
                <div className="space-y-2 min-w-[200px] p-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base">{asset.name}</h3>
                    {statusInfo && (
                      <span className="text-lg">{statusInfo.icon}</span>
                    )}
                  </div>
                  
                  <Badge variant="secondary" className="text-xs">
                    {typeInfo?.label || asset.type}
                  </Badge>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{asset.location}</span>
                    </div>
                    
                    <div className="font-semibold text-primary">
                      {Number(asset.estimated_value).toLocaleString('fr-FR')} F CFA
                    </div>
                  </div>
                  
                  {asset.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                      {asset.description}
                    </p>
                  )}
                  
                  <div className="pt-2 border-t">
                    <a
                      href={getGoogleMapsUrl(asset.latitude!, asset.longitude!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Voir dans Google Maps
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatCoordinates(asset.latitude!, asset.longitude!)}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;

