import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";
import { useToast } from "@/hooks/use-toast";
import { config } from "./config";
import { demoUser } from "./demo-user";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (config.isDemoMode) {
        // In demo mode, simulate login with demo user
        return { user: demoUser };
      }
      const response = await apiRequest("POST", "/api/login", { email, password });
      return response.json();
    },
    onSuccess: (data: any) => {
      setUser(data.user);
      localStorage.setItem("propmanpulse_user", JSON.stringify(data.user));
      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${data.user.firstName} ${data.user.lastName}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("propmanpulse_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  useEffect(() => {
    if (config.isDemoMode) {
      // In demo mode, automatically login with demo user
      setUser(demoUser);
      localStorage.setItem("propmanpulse_user", JSON.stringify(demoUser));
      setIsLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("propmanpulse_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("propmanpulse_user");
      }
    }
    setIsLoading(false);
  }, []);

  const contextValue = { user, login, logout, isLoading };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export type { User, AuthContextType };