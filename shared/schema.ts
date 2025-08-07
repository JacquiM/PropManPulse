import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table with role-based access
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull().default("tenant"), // admin, manager, owner, tenant
  companyId: varchar("company_id"),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Companies/Organizations
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // management_company, body_corporate, hoa
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Properties
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address").notNull(),
  type: text("type").notNull(), // residential, commercial, mixed_use, industrial
  managementType: text("management_type").notNull(), // community, rental
  totalUnits: integer("total_units"),
  companyId: varchar("company_id").notNull(),
  imageUrl: text("image_url"),
  annualLevy: decimal("annual_levy"),
  complianceRate: integer("compliance_rate").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Units within properties
export const units = pgTable("units", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").notNull(),
  unitNumber: text("unit_number").notNull(),
  type: text("type").notNull(), // apartment, house, office, shop
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  size: decimal("size"), // square meters
  monthlyRent: decimal("monthly_rent"),
  isOccupied: boolean("is_occupied").default(false),
  tenantId: varchar("tenant_id"),
  ownerId: varchar("owner_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Maintenance tickets
export const maintenanceTickets = pgTable("maintenance_tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketNumber: text("ticket_number").notNull().unique(),
  propertyId: varchar("property_id").notNull(),
  unitId: varchar("unit_id"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // plumbing, electrical, hvac, general
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  status: text("status").notNull().default("open"), // open, in_progress, completed, cancelled
  reportedBy: varchar("reported_by").notNull(),
  assignedTo: varchar("assigned_to"),
  estimatedCost: decimal("estimated_cost"),
  actualCost: decimal("actual_cost"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Inspections
export const inspections = pgTable("inspections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").notNull(),
  unitId: varchar("unit_id"),
  type: text("type").notNull(), // safety, maintenance, compliance, move_in, move_out
  scheduledDate: timestamp("scheduled_date").notNull(),
  completedDate: timestamp("completed_date"),
  inspectorId: varchar("inspector_id").notNull(),
  status: text("status").notNull().default("scheduled"), // scheduled, in_progress, completed, cancelled
  findings: jsonb("findings"), // JSON array of inspection findings
  reportUrl: text("report_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Financial transactions
export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id"),
  unitId: varchar("unit_id"),
  type: text("type").notNull(), // levy, rent, maintenance, deposit, refund
  category: text("category").notNull(), // income, expense
  amount: decimal("amount").notNull(),
  description: text("description").notNull(),
  paymentMethod: text("payment_method"), // bank_transfer, debit_order, cash, card
  reference: text("reference"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  dueDate: timestamp("due_date"),
  paidDate: timestamp("paid_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Compliance items
export const complianceItems = pgTable("compliance_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyId: varchar("property_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // safety, legal, financial, environmental
  dueDate: timestamp("due_date").notNull(),
  completedDate: timestamp("completed_date"),
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, overdue
  assignedTo: varchar("assigned_to"),
  documents: jsonb("documents"), // Array of document URLs
  createdAt: timestamp("created_at").defaultNow(),
});

// Communications/Messages
export const communications = pgTable("communications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromUserId: varchar("from_user_id").notNull(),
  toUserId: varchar("to_user_id"),
  propertyId: varchar("property_id"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // email, sms, notification, announcement
  status: text("status").notNull().default("sent"), // sent, delivered, read
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertUnitSchema = createInsertSchema(units).omit({
  id: true,
  createdAt: true,
});

export const insertMaintenanceTicketSchema = createInsertSchema(maintenanceTickets).omit({
  id: true,
  createdAt: true,
});

export const insertInspectionSchema = createInsertSchema(inspections).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertComplianceItemSchema = createInsertSchema(complianceItems).omit({
  id: true,
  createdAt: true,
});

export const insertCommunicationSchema = createInsertSchema(communications).omit({
  id: true,
  createdAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
export type InsertUnit = z.infer<typeof insertUnitSchema>;
export type Unit = typeof units.$inferSelect;
export type InsertMaintenanceTicket = z.infer<typeof insertMaintenanceTicketSchema>;
export type MaintenanceTicket = typeof maintenanceTickets.$inferSelect;
export type InsertInspection = z.infer<typeof insertInspectionSchema>;
export type Inspection = typeof inspections.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertComplianceItem = z.infer<typeof insertComplianceItemSchema>;
export type ComplianceItem = typeof complianceItems.$inferSelect;
export type InsertCommunication = z.infer<typeof insertCommunicationSchema>;
export type Communication = typeof communications.$inferSelect;
