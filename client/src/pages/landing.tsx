import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import DemoModal from "@/components/demo-modal";
import LoginModal from "@/components/login-modal";
import { Activity, Building2, Home, Bolt, Shield, Users, TrendingUp, CheckCircle } from "lucide-react";

export default function Landing() {
  const [showDemo, setShowDemo] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const solutions = [
    {
      icon: Building2,
      title: "Community Management",
      description: "For the management of Community schemes (Body corporate & HOA's)",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Home,
      title: "Rental Asset Management",
      description: "For the management of your residential and commercial properties.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Bolt,
      title: "Maintenance & Inspections",
      description: "For the management of your Inspections and Maintenance.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Shield,
      title: "Compliance & Governance",
      description: "Complete compliance management with regulatory tracking and auditing.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  const stats = [
    { value: "750,000+", label: "Units Under Management" },
    { value: "2,500+", label: "Clients" },
    { value: "50,000+", label: "Registered Users" },
  ];

  const benefits = [
    {
      title: "Compliancy",
      description: "We've turned the time-consuming process of compliance into an efficient and easy-to-maintain course of action, managed and monitored via our intuitive platform.",
      icon: CheckCircle,
    },
    {
      title: "Manageability",
      description: "Our intelligent dashboards provide real-time KPI tracking and business monitoring for the ultimate in manageability as well as effortless interdepartmental collaboration.",
      icon: Activity,
    },
    {
      title: "Scalability",
      description: "Efficiency + manageability = scalability. We keep your finger on the pulse of your business so that you can enjoy the ultimate in sustainable growth.",
      icon: TrendingUp,
    },
    {
      title: "Profitability",
      description: "With compliancy, manageability and scalability comes profit. PropManPulse is the boost you never knew your bottom line needed.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onLogin={() => setShowLogin(true)} />
      
      {/* Hero Section */}
      <section className="relative hero-gradient">
        {/* Background overlay with professional property management dashboard */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              The most advanced end-to-end ecosystem for property management
            </h1>
            <p className="mt-6 text-xl text-white max-w-3xl mx-auto">
              Your Pulse on Property Management Excellence. Experience intelligent solutions for Community Schemes, Rental Portfolios, and Inspection & Maintenance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                onClick={() => setShowDemo(true)}
              >
                Book a Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our solutions at a glance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${solution.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <solution.icon className={`h-6 w-6 ${solution.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                  <p className="text-gray-600">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your biggest challenges, solved.</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've been where you are. We've heard what you've said. These are the simple solutions you've asked for, delivered with the finesse only first-hand property experience can provide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-12">Join 20,000+ Property Professionals using PropManPulse</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-xl opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Promise</h2>
            <p className="text-xl text-gray-600 mb-8">We always deliver.</p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              Adopting new software for your business is a big commitment. Rest assured: we have what it takes to ensure your transition is a success. Our solutions are meticulously designed for a seamless migration and easy adoption. Failure is not an option. Your success is our success.
            </p>
            <Button size="lg" onClick={() => setShowDemo(true)}>
              Get In Touch
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">Seamless Migration</Badge>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">Unlimited access to Training</Badge>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">Ongoing Support</Badge>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">A journey to Customer Success</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <DemoModal open={showDemo} onOpenChange={setShowDemo} />
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </div>
  );
}
