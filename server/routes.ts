import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema,
  insertPropertySchema,
  insertMaintenanceTicketSchema,
  insertInspectionSchema,
  insertTransactionSchema,
  insertComplianceItemSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard stats route
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      const tickets = await storage.getMaintenanceTickets();
      const users = await storage.getUsers();
      const transactions = await storage.getTransactions();
      
      const stats = {
        totalProperties: properties.length,
        activeTenants: users.filter(u => u.role === 'tenant').length,
        openTickets: tickets.filter(t => t.status === 'open').length,
        complianceRate: 85, // Mock compliance rate
        monthlyRevenue: transactions.reduce((sum, t) => {
          if (t.category === 'income' && t.status === 'completed') {
            return sum + parseFloat(t.amount || '0');
          }
          return sum;
        }, 0)
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Authentication routes
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Create user error:", error);
      res.status(400).json({ message: "Failed to create user" });
    }
  });

  // Property routes
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      console.error("Get properties error:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error("Get property error:", error);
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(propertyData);
      res.status(201).json(property);
    } catch (error) {
      console.error("Create property error:", error);
      res.status(400).json({ message: "Failed to create property" });
    }
  });

  // Maintenance ticket routes
  app.get("/api/maintenance-tickets", async (req, res) => {
    try {
      const tickets = await storage.getMaintenanceTickets();
      res.json(tickets);
    } catch (error) {
      console.error("Get tickets error:", error);
      res.status(500).json({ message: "Failed to fetch maintenance tickets" });
    }
  });

  app.get("/api/maintenance-tickets/:id", async (req, res) => {
    try {
      const ticket = await storage.getMaintenanceTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: "Maintenance ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      console.error("Get ticket error:", error);
      res.status(500).json({ message: "Failed to fetch maintenance ticket" });
    }
  });

  app.post("/api/maintenance-tickets", async (req, res) => {
    try {
      const ticketData = insertMaintenanceTicketSchema.parse(req.body);
      const ticket = await storage.createMaintenanceTicket(ticketData);
      res.status(201).json(ticket);
    } catch (error) {
      console.error("Create ticket error:", error);
      res.status(400).json({ message: "Failed to create maintenance ticket" });
    }
  });

  app.patch("/api/maintenance-tickets/:id", async (req, res) => {
    try {
      const updates = req.body;
      const ticket = await storage.updateMaintenanceTicket(req.params.id, updates);
      res.json(ticket);
    } catch (error) {
      console.error("Update ticket error:", error);
      res.status(400).json({ message: "Failed to update maintenance ticket" });
    }
  });

  // Inspection routes
  app.get("/api/inspections", async (req, res) => {
    try {
      const inspections = await storage.getInspections();
      res.json(inspections);
    } catch (error) {
      console.error("Get inspections error:", error);
      res.status(500).json({ message: "Failed to fetch inspections" });
    }
  });

  app.post("/api/inspections", async (req, res) => {
    try {
      const inspectionData = insertInspectionSchema.parse(req.body);
      const inspection = await storage.createInspection(inspectionData);
      res.status(201).json(inspection);
    } catch (error) {
      console.error("Create inspection error:", error);
      res.status(400).json({ message: "Failed to create inspection" });
    }
  });

  // Transaction routes
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getTransactions();
      res.json(transactions);
    } catch (error) {
      console.error("Get transactions error:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const transactionData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(transactionData);
      res.status(201).json(transaction);
    } catch (error) {
      console.error("Create transaction error:", error);
      res.status(400).json({ message: "Failed to create transaction" });
    }
  });

  // Compliance routes
  app.get("/api/compliance-items", async (req, res) => {
    try {
      const items = await storage.getComplianceItems();
      res.json(items);
    } catch (error) {
      console.error("Get compliance items error:", error);
      res.status(500).json({ message: "Failed to fetch compliance items" });
    }
  });

  app.post("/api/compliance-items", async (req, res) => {
    try {
      const itemData = insertComplianceItemSchema.parse(req.body);
      const item = await storage.createComplianceItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      console.error("Create compliance item error:", error);
      res.status(400).json({ message: "Failed to create compliance item" });
    }
  });

  // Dashboard stats route
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const properties = await storage.getProperties();
      const tickets = await storage.getMaintenanceTickets();
      const transactions = await storage.getTransactions();
      
      const totalProperties = properties.length;
      const activeTenants = properties.reduce((sum, p) => sum + (p.totalUnits || 0), 0);
      const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
      const avgComplianceRate = Math.round(
        properties.reduce((sum, p) => sum + (p.complianceRate || 0), 0) / properties.length
      );

      const monthlyRevenue = transactions
        .filter(t => t.category === 'income' && t.status === 'completed')
        .reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0);

      res.json({
        totalProperties,
        activeTenants,
        openTickets,
        complianceRate: avgComplianceRate,
        monthlyRevenue: Math.round(monthlyRevenue),
      });
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Demo request route
  app.post("/api/demo-request", async (req, res) => {
    try {
      const { email, firstName, lastName, phone, company } = req.body;
      
      if (!email || !firstName || !lastName || !phone || !company) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // In a real application, this would send an email or save to database
      console.log("Demo request received:", { email, firstName, lastName, phone, company });
      
      res.json({ message: "Demo request submitted successfully" });
    } catch (error) {
      console.error("Demo request error:", error);
      res.status(500).json({ message: "Failed to submit demo request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
