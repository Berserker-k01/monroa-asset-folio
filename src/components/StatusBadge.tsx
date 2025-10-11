import { Badge } from "@/components/ui/badge";
import { AssetStatus, ASSET_STATUSES } from "@/lib/types";

interface StatusBadgeProps {
  status: AssetStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusInfo = ASSET_STATUSES.find(s => s.value === status);
  
  if (!statusInfo) return null;

  return (
    <Badge 
      variant="outline" 
      className="gap-1.5 font-medium border-2"
      style={{ 
        borderColor: statusInfo.color,
        color: statusInfo.color,
      }}
    >
      <span>{statusInfo.icon}</span>
      {statusInfo.label}
    </Badge>
  );
};

export default StatusBadge;