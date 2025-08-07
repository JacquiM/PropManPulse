import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { X, Building2, Home, Wrench } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login } = useAuth();

  const loginOptions = [
    {
      title: "Community Management Software",
      icon: Building2,
      color: "text-primary",
      borderColor: "border-primary/20 hover:border-primary",
      bgColor: "hover:bg-primary/5",
      credentials: { email: "admin@propmanpulse.com", password: "admin123" },
    },
    {
      title: "Rental Asset Management Software", 
      icon: Home,
      color: "text-secondary",
      borderColor: "border-secondary/20 hover:border-secondary",
      bgColor: "hover:bg-secondary/5",
      credentials: { email: "manager@propmanpulse.com", password: "manager123" },
    },
    {
      title: "Inspections & Maintenance Management Software",
      icon: Wrench,
      color: "text-primary",
      borderColor: "border-primary/20 hover:border-primary",
      bgColor: "hover:bg-primary/5",
      credentials: { email: "admin@propmanpulse.com", password: "admin123" },
    },
  ];

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials.email, credentials.password);
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in the auth context
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Sign in to your account
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <p className="text-gray-600 mb-8">
          Please select the account you are registered with to sign in.
        </p>
        
        <div className="space-y-4">
          {loginOptions.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full p-4 h-auto ${option.borderColor} ${option.bgColor} text-left justify-start transition-colors`}
              onClick={() => handleLogin(option.credentials)}
            >
              <div className="flex items-center">
                <option.icon className={`${option.color} text-xl mr-4 h-5 w-5`} />
                <div>
                  <div className="font-semibold text-gray-900">{option.title}</div>
                  <div className="text-sm text-gray-600">Sign in</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
