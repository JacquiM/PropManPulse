import { useParams } from "wouter";
import DashboardLayout from "@/components/dashboard-layout";
import CommunityManagement from "./community-management";
import RentalManagement from "./rental-management";
import Maintenance from "./maintenance";
import Compliance from "./compliance";
import StatsCard from "@/components/stats-card";
import { useQuery } from "@tanstack/react-query";
import { Building2, Users, AlertTriangle, CheckCircle, TrendingUp, Calendar, Wrench, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function DashboardOverview() {
  interface DashboardStats {
    totalProperties: number;
    activeTenants: number;
    openTickets: number;
    complianceRate: number;
    monthlyRevenue: number;
  }

  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const recentActivities = [
    {
      id: 1,
      title: "Leaking faucet - Unit 204",
      property: "Sunset Gardens Complex",
      type: "maintenance",
      priority: "high",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "HVAC service required",
      property: "Oceanview Towers",
      type: "maintenance",
      priority: "medium",
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Compliance audit completed",
      property: "Metro Business Complex",
      type: "compliance",
      priority: "completed",
      time: "1 day ago",
    },
  ];

  const upcomingInspections = [
    {
      id: 1,
      title: "Monthly Safety Inspection",
      property: "Palm Ridge Estate",
      date: "Tomorrow at 10:00 AM",
      type: "safety",
    },
    {
      id: 2,
      title: "Property Condition Assessment",
      property: "Hillside Manor",
      date: "Friday at 2:00 PM",
      type: "assessment",
    },
    {
      id: 3,
      title: "Compliance Audit",
      property: "Metro Business Complex",
      date: "Next Monday at 9:00 AM",
      type: "compliance",
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Your comprehensive property management insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Properties"
          value={stats?.totalProperties || 0}
          icon={Building2}
          trend="+12%"
          trendLabel="from last month"
          color="text-primary"
          bgColor="bg-primary/10"
        />
        <StatsCard
          title="Active Tenants"
          value={stats?.activeTenants || 0}
          icon={Users}
          trend="+8%"
          trendLabel="from last month"
          color="text-secondary"
          bgColor="bg-secondary/10"
        />
        <StatsCard
          title="Open Tickets"
          value={stats?.openTickets || 0}
          icon={AlertTriangle}
          trend="+3"
          trendLabel="since yesterday"
          color="text-warning"
          bgColor="bg-warning/10"
          trendColor="text-error"
        />
        <StatsCard
          title="Compliance Rate"
          value={`${stats?.complianceRate || 0}%`}
          icon={CheckCircle}
          trend="+2%"
          trendLabel="from last quarter"
          color="text-success"
          bgColor="bg-success/10"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart would be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Current: R{stats?.monthlyRevenue?.toLocaleString() || "0"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Portfolio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-secondary" />
              Property Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Portfolio distribution chart would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Maintenance Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Recent Maintenance Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.priority === 'high' ? 'bg-error' :
                        activity.priority === 'medium' ? 'bg-warning' :
                        activity.priority === 'completed' ? 'bg-success' : 'bg-gray-400'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.property}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant={
                      activity.priority === 'high' ? 'destructive' :
                      activity.priority === 'medium' ? 'secondary' :
                      activity.priority === 'completed' ? 'default' : 'outline'
                    }>
                      {activity.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Inspections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Upcoming Inspections
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {upcomingInspections.map((inspection) => (
                <div key={inspection.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{inspection.title}</p>
                      <p className="text-sm text-gray-600">{inspection.property}</p>
                      <p className="text-xs text-gray-500">{inspection.date}</p>
                    </div>
                    <div className="flex items-center">
                      {inspection.type === 'safety' && <Shield className="h-5 w-5 text-primary" />}
                      {inspection.type === 'assessment' && <CheckCircle className="h-5 w-5 text-secondary" />}
                      {inspection.type === 'compliance' && <AlertTriangle className="h-5 w-5 text-warning" />}
                    </div>
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

export default function Dashboard() {
  const params = useParams();
  const section = params.section || "overview";

  const renderSection = () => {
    switch (section) {
      case "community":
        return <CommunityManagement />;
      case "rental":
        return <RentalManagement />;
      case "maintenance":
        return <Maintenance />;
      case "compliance":
        return <Compliance />;
      case "overview":
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout>
      {renderSection()}
    </DashboardLayout>
  );
}
