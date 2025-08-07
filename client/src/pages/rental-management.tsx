import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/property-card";
import { Home, Plus, Search, Filter, DollarSign, Users, TrendingUp, AlertTriangle } from "lucide-react";
import type { Property } from "@shared/schema";

export default function RentalManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const rentalProperties = properties.filter((p: Property) => p.managementType === "rental");

  const portfolioStats = {
    totalUnits: rentalProperties.reduce((sum: number, p: Property) => sum + (p.totalUnits || 0), 0),
    occupiedUnits: Math.round(rentalProperties.reduce((sum: number, p: Property) => sum + (p.totalUnits || 0), 0) * 0.87),
    monthlyIncome: 1250000,
    occupancyRate: 87,
  };

  const recentTenantActivities = [
    {
      id: 1,
      tenant: "Michael Smith",
      unit: "Unit 12A",
      property: "Riverside Apartments",
      activity: "Lease renewal signed",
      date: "2 days ago",
      type: "renewal",
    },
    {
      id: 2,
      tenant: "Jennifer Davis",
      unit: "Unit 5B",
      property: "City Center Plaza",
      activity: "Maintenance request submitted",
      date: "1 day ago",
      type: "maintenance",
    },
    {
      id: 3,
      tenant: "Robert Wilson",
      unit: "Unit 8C",
      property: "Garden View Complex",
      activity: "Payment received",
      date: "3 hours ago",
      type: "payment",
    },
  ];

  const upcomingLeaseExpirations = [
    {
      id: 1,
      tenant: "Sarah Johnson",
      unit: "Unit 15A",
      property: "Downtown Towers",
      expirationDate: "Dec 31, 2024",
      status: "pending_renewal",
    },
    {
      id: 2,
      tenant: "David Brown",
      unit: "Unit 22B",
      property: "Seaside Apartments",
      expirationDate: "Jan 15, 2025",
      status: "renewal_offered",
    },
    {
      id: 3,
      tenant: "Lisa Anderson",
      unit: "Unit 7D",
      property: "Metro Heights",
      expirationDate: "Feb 28, 2025",
      status: "notice_given",
    },
  ];

  const filteredProperties = rentalProperties.filter((property: any) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rental Management</h1>
          <p className="text-gray-600">Manage your residential and commercial rental portfolio</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">{portfolioStats.totalUnits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupied Units</p>
                <p className="text-2xl font-bold text-gray-900">{portfolioStats.occupiedUnits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">
                  R {(portfolioStats.monthlyIncome / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-gray-900">{portfolioStats.occupancyRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Rental Properties ({filteredProperties.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-8">
                <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchQuery ? "No properties match your search" : "No rental properties found"}
                </p>
                {!searchQuery && (
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Rental Property
                  </Button>
                )}
              </div>
            ) : (
              filteredProperties.map((property: any) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => setSelectedProperty(property.id)}
                  showManagementType={false}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tenant Activities and Lease Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tenant Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              Recent Tenant Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {recentTenantActivities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'renewal' ? 'bg-success/10' :
                      activity.type === 'maintenance' ? 'bg-warning/10' :
                      activity.type === 'payment' ? 'bg-primary/10' : 'bg-gray-100'
                    }`}>
                      {activity.type === 'renewal' && <TrendingUp className="h-4 w-4 text-success" />}
                      {activity.type === 'maintenance' && <AlertTriangle className="h-4 w-4 text-warning" />}
                      {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.tenant}</p>
                      <p className="text-sm text-gray-600">{activity.activity}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.unit}, {activity.property} • {activity.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Lease Expirations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Upcoming Lease Expirations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {upcomingLeaseExpirations.map((lease) => (
                <div key={lease.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lease.tenant}</p>
                      <p className="text-sm text-gray-600">{lease.unit}, {lease.property}</p>
                      <p className="text-xs text-gray-500 mt-1">Expires: {lease.expirationDate}</p>
                    </div>
                    <Badge variant={
                      lease.status === 'pending_renewal' ? 'secondary' :
                      lease.status === 'renewal_offered' ? 'default' :
                      lease.status === 'notice_given' ? 'destructive' : 'outline'
                    }>
                      {lease.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
