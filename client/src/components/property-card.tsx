import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, DollarSign, TrendingUp, ChevronRight } from "lucide-react";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    type: string;
    managementType: string;
    totalUnits?: number;
    imageUrl?: string;
    annualLevy?: string;
    complianceRate?: number;
  };
  onClick?: () => void;
  showManagementType?: boolean;
}

export default function PropertyCard({ 
  property, 
  onClick, 
  showManagementType = true 
}: PropertyCardProps) {
  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return "N/A";
    const num = parseFloat(amount);
    if (num >= 1000000) {
      return `R ${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `R ${(num / 1000).toFixed(0)}K`;
    }
    return `R ${num.toLocaleString()}`;
  };

  const getComplianceColor = (rate?: number) => {
    if (!rate) return "bg-gray-100 text-gray-800";
    if (rate >= 95) return "bg-success text-white";
    if (rate >= 85) return "bg-warning text-white";
    return "bg-error text-white";
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'residential':
        return "bg-primary/10 text-primary";
      case 'commercial':
        return "bg-secondary/10 text-secondary";
      case 'mixed_use':
        return "bg-purple-100 text-purple-700";
      case 'industrial':
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card 
      className={`property-card ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              {property.imageUrl ? (
                <img 
                  src={property.imageUrl} 
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="h-8 w-8 text-gray-400" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-900">{property.name}</h4>
                {showManagementType && (
                  <Badge variant="outline" className="text-xs">
                    {property.managementType}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{property.address}</p>
              
              <div className="flex items-center space-x-4 text-sm">
                <Badge className={getTypeColor(property.type)}>
                  {property.type.replace('_', ' ')}
                </Badge>
                
                {property.totalUnits && (
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{property.totalUnits} Units</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mt-2 text-sm">
                {property.complianceRate !== undefined && (
                  <Badge className={getComplianceColor(property.complianceRate)}>
                    {property.complianceRate}% Compliance
                  </Badge>
                )}
                
                {property.annualLevy && (
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{formatCurrency(property.annualLevy)} Annual</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {onClick && (
            <div className="text-right">
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
