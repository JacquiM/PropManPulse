import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/property-card";
import { Building2, Plus, FileText, Calendar, BarChart3, TrendingUp, DollarSign, Users, AlertCircle } from "lucide-react";
import type { Property } from "@shared/schema";

export default function CommunityManagement() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const communityProperties = properties.filter((p: Property) => p.managementType === "community");

  const quickActions = [
    { label: "Add Community", icon: Plus, color: "text-primary", bgColor: "bg-primary/5" },
    { label: "Generate Levy Roll", icon: FileText, color: "text-gray-700", bgColor: "bg-gray-50" },
    { label: "Schedule AGM", icon: Calendar, color: "text-gray-700", bgColor: "bg-gray-50" },
    { label: "Compliance Report", icon: BarChart3, color: "text-gray-700", bgColor: "bg-gray-50" },
  ];

  const financialSummary = {
    totalLevyIncome: 4200000,
    reserveFund: 890000,
    outstandingArrears: 145000,
    collectionRate: 92,
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Community Management</h1>
        <p className="text-gray-600">Body Corporate & HOA Management Dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Community Schemes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Community Schemes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {communityProperties.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No community schemes found</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Community
                  </Button>
                </div>
              ) : (
                communityProperties.map((property: any) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => setSelectedProperty(property.id)}
                    showManagementType={false}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start ${action.bgColor} ${action.color} hover:${action.bgColor}/80`}
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-success" />
            Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                R {(financialSummary.totalLevyIncome / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">Total Levy Income</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                R {Math.round(financialSummary.reserveFund / 1000)}K
              </div>
              <div className="text-sm text-gray-600">Reserve Fund</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                R {Math.round(financialSummary.outstandingArrears / 1000)}K
              </div>
              <div className="text-sm text-gray-600">Outstanding Arrears</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {financialSummary.collectionRate}%
              </div>
              <div className="text-sm text-gray-600">Collection Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Community Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Compliance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">AGM Due - Sunset Gardens</p>
                  <p className="text-sm text-gray-600">Annual General Meeting scheduled for next month</p>
                  <Badge variant="secondary" className="mt-2">Due in 30 days</Badge>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                <Building2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Insurance Renewal - Oceanview Towers</p>
                  <p className="text-sm text-gray-600">Building insurance renewal approaching</p>
                  <Badge variant="outline" className="mt-2">Due in 60 days</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              Trustee Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New Trustee Appointed</p>
                  <p className="text-sm text-gray-600">Sarah Johnson elected as chairperson for Sunset Gardens</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <FileText className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Meeting Minutes Approved</p>
                  <p className="text-sm text-gray-600">October trustee meeting minutes approved and distributed</p>
                  <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
