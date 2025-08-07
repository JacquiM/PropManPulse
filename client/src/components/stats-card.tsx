import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendLabel?: string;
  color?: string;
  bgColor?: string;
  trendColor?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color = "text-primary",
  bgColor = "bg-primary/10",
  trendColor = "text-success",
}: StatsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {trend && trendLabel && (
          <div className="mt-4 flex items-center text-sm">
            <span className={`font-medium ${trendColor}`}>{trend}</span>
            <span className="text-gray-600 ml-2">{trendLabel}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
