import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  User, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";

interface MaintenanceTicketProps {
  ticket: {
    id: string;
    ticketNumber: string;
    title: string;
    description: string;
    category: string;
    priority: string;
    status: string;
    propertyId: string;
    unitId?: string;
    reportedBy: string;
    assignedTo?: string;
    estimatedCost?: string;
    actualCost?: string;
    createdAt: string;
    completedAt?: string;
  };
}

export default function MaintenanceTicket({ ticket }: MaintenanceTicketProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateTicketMutation = useMutation({
    mutationFn: async (data: { id: string; updates: any }) => {
      return apiRequest("PATCH", `/api/maintenance-tickets/${data.id}`, data.updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance-tickets"] });
      toast({
        title: "Success",
        description: "Ticket updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return "bg-error text-white";
      case 'high':
        return "bg-error text-white";
      case 'medium':
        return "bg-warning text-white";
      case 'low':
        return "bg-success text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return "bg-success text-white";
      case 'in_progress':
        return "bg-warning text-white";
      case 'open':
        return "bg-primary text-white";
      case 'cancelled':
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
      case 'high':
        return AlertCircle;
      case 'medium':
        return Clock;
      case 'low':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const handleStatusChange = (newStatus: string) => {
    const updates: any = { status: newStatus };
    if (newStatus === 'completed' && !ticket.completedAt) {
      updates.completedAt = new Date().toISOString();
    }
    
    updateTicketMutation.mutate({
      id: ticket.id,
      updates,
    });
  };

  const PriorityIcon = getPriorityIcon(ticket.priority);

  return (
    <Card className="maintenance-ticket">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              ticket.priority === 'urgent' || ticket.priority === 'high' 
                ? 'bg-error/10' : ticket.priority === 'medium' 
                ? 'bg-warning/10' : 'bg-success/10'
            }`}>
              <PriorityIcon className={`h-4 w-4 ${
                ticket.priority === 'urgent' || ticket.priority === 'high' 
                  ? 'text-error' : ticket.priority === 'medium' 
                  ? 'text-warning' : 'text-success'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-900">{ticket.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {ticket.ticketNumber}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="capitalize">{ticket.category}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(ticket.createdAt), "MMM dd, yyyy")}
                </div>
                {ticket.assignedTo && (
                  <>
                    <span>•</span>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      Assigned to {ticket.assignedTo}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Ticket
              </DropdownMenuItem>
              <DropdownMenuItem className="text-error">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Ticket
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(ticket.priority)}>
              {ticket.priority}
            </Badge>
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status.replace('_', ' ')}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            {ticket.estimatedCost && (
              <span className="text-sm text-gray-600">
                Est. R{parseFloat(ticket.estimatedCost).toLocaleString()}
              </span>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Update Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleStatusChange('open')}>
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('in_progress')}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('cancelled')}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {ticket.completedAt && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="text-xs text-success">
              Completed on {format(new Date(ticket.completedAt), "MMM dd, yyyy 'at' HH:mm")}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
