import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/components/logo";

interface NavigationProps {
  onLogin: () => void;
}

export default function Navigation({ onLogin }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: "Community Management", href: "#community" },
    { label: "Rental Management", href: "#rental" },
    { label: "Maintenance", href: "#maintenance" },
    { label: "Compliance", href: "#compliance" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Logo size="md" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Button onClick={onLogin} className="bg-primary text-white hover:bg-primary/90">
                Sign In
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex items-center mb-8">
                  <Logo size="sm" />
                </div>
                <div className="space-y-4">
                  {navigationItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      onClick={() => {
                        onLogin();
                        setIsOpen(false);
                      }} 
                      className="w-full bg-primary text-white hover:bg-primary/90"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
