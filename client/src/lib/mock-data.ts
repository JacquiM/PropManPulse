// This file contains mock data for the PropManPulse application
// Used for demonstration purposes as specified in the success criteria

export const mockStats = {
  totalProperties: 247,
  activeTenants: 1842,
  openTickets: 38,
  complianceRate: 94,
  monthlyRevenue: 2400000,
};

export const mockRecentActivities = [
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
    title: "Painting touch-up completed",
    property: "Riverside Apartments",
    type: "maintenance",
    priority: "completed",
    time: "1 day ago",
  },
];

export const mockUpcomingInspections = [
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

export const mockUserProfiles = [
  {
    id: "admin-1",
    name: "John Administrator",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "manager-1", 
    name: "Sarah Manager",
    role: "Property Manager",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Megan Ladbrook",
    company: "Only Realty",
    role: "Creative Director",
    testimonial: "We haven't found anything that worked as well as PropManPulse.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Tanya Oosthuizen", 
    company: "Professional Property Management",
    role: "Office Manager",
    testimonial: "I have been in property management for nearly 8 years and maintenance has never been this efficient. The interface is user friendly and inspection reports have never been more professional.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Mark Moore",
    company: "Kellaprince",
    role: "Office Manager", 
    testimonial: "We love PropManPulse - since we started using it about 4 months ago, our monthly inspections run more efficiently saving us time as well as effort.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

export const mockPropertyImages = {
  residential: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop", 
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
  ],
  commercial: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  ],
};

// Color scheme for charts and visualizations
export const chartColors = {
  primary: "#036666",
  secondary: "#30B2BE", 
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
};
