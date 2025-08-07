import { 
  type User, 
  type InsertUser,
  type Company,
  type InsertCompany,
  type Property,
  type InsertProperty,
  type Unit,
  type InsertUnit,
  type MaintenanceTicket,
  type InsertMaintenanceTicket,
  type Inspection,
  type InsertInspection,
  type Transaction,
  type InsertTransaction,
  type ComplianceItem,
  type InsertComplianceItem,
  type Communication,
  type InsertCommunication
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  
  // Company operations
  getCompany(id: string): Promise<Company | undefined>;
  getCompanies(): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
  
  // Property operations
  getProperty(id: string): Promise<Property | undefined>;
  getProperties(): Promise<Property[]>;
  getPropertiesByCompany(companyId: string): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, updates: Partial<Property>): Promise<Property>;
  
  // Unit operations
  getUnit(id: string): Promise<Unit | undefined>;
  getUnits(): Promise<Unit[]>;
  getUnitsByProperty(propertyId: string): Promise<Unit[]>;
  createUnit(unit: InsertUnit): Promise<Unit>;
  updateUnit(id: string, updates: Partial<Unit>): Promise<Unit>;
  
  // Maintenance operations
  getMaintenanceTicket(id: string): Promise<MaintenanceTicket | undefined>;
  getMaintenanceTickets(): Promise<MaintenanceTicket[]>;
  getMaintenanceTicketsByProperty(propertyId: string): Promise<MaintenanceTicket[]>;
  createMaintenanceTicket(ticket: InsertMaintenanceTicket): Promise<MaintenanceTicket>;
  updateMaintenanceTicket(id: string, updates: Partial<MaintenanceTicket>): Promise<MaintenanceTicket>;
  
  // Inspection operations
  getInspection(id: string): Promise<Inspection | undefined>;
  getInspections(): Promise<Inspection[]>;
  getInspectionsByProperty(propertyId: string): Promise<Inspection[]>;
  createInspection(inspection: InsertInspection): Promise<Inspection>;
  updateInspection(id: string, updates: Partial<Inspection>): Promise<Inspection>;
  
  // Transaction operations
  getTransaction(id: string): Promise<Transaction | undefined>;
  getTransactions(): Promise<Transaction[]>;
  getTransactionsByProperty(propertyId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction>;
  
  // Compliance operations
  getComplianceItem(id: string): Promise<ComplianceItem | undefined>;
  getComplianceItems(): Promise<ComplianceItem[]>;
  getComplianceItemsByProperty(propertyId: string): Promise<ComplianceItem[]>;
  createComplianceItem(item: InsertComplianceItem): Promise<ComplianceItem>;
  updateComplianceItem(id: string, updates: Partial<ComplianceItem>): Promise<ComplianceItem>;
  
  // Communication operations
  getCommunication(id: string): Promise<Communication | undefined>;
  getCommunications(): Promise<Communication[]>;
  getCommunicationsByUser(userId: string): Promise<Communication[]>;
  createCommunication(communication: InsertCommunication): Promise<Communication>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private companies: Map<string, Company> = new Map();
  private properties: Map<string, Property> = new Map();
  private units: Map<string, Unit> = new Map();
  private maintenanceTickets: Map<string, MaintenanceTicket> = new Map();
  private inspections: Map<string, Inspection> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private complianceItems: Map<string, ComplianceItem> = new Map();
  private communications: Map<string, Communication> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Create demo users
    const adminUser: User = {
      id: "admin-1",
      email: "admin@propmanpulse.com",
      password: "admin123",
      firstName: "John",
      lastName: "Administrator",
      role: "admin",
      companyId: "company-1",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const managerUser: User = {
      id: "manager-1",
      email: "manager@propmanpulse.com",
      password: "manager123",
      firstName: "Sarah",
      lastName: "Manager",
      role: "manager",
      companyId: "company-1",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.set(adminUser.id, adminUser);
    this.users.set(managerUser.id, managerUser);

    // Create demo company
    const company: Company = {
      id: "company-1",
      name: "PropManPulse Management",
      type: "management_company",
      address: "123 Property Street, Business District",
      phone: "+27 11 123 4567",
      email: "info@propmanpulse.com",
      createdAt: new Date(),
    };
    this.companies.set(company.id, company);

    // Create demo properties
    const properties = [
      {
        id: "property-1",
        name: "Sunset Gardens Complex",
        address: "456 Sunset Boulevard, Residential Area",
        type: "residential",
        managementType: "community",
        totalUnits: 124,
        companyId: "company-1",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        annualLevy: "2400000",
        complianceRate: 94,
        createdAt: new Date(),
      },
      {
        id: "property-2",
        name: "Oceanview Towers",
        address: "789 Ocean Drive, Coastal District",
        type: "residential",
        managementType: "community",
        totalUnits: 87,
        companyId: "company-1",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
        annualLevy: "1800000",
        complianceRate: 89,
        createdAt: new Date(),
      },
    ];

    properties.forEach(property => {
      this.properties.set(property.id, property as Property);
    });

    // Create demo maintenance tickets
    const tickets = [
      {
        id: "ticket-1",
        ticketNumber: "MT-2024-001",
        propertyId: "property-1",
        unitId: "unit-1",
        title: "Leaking faucet in kitchen",
        description: "Kitchen faucet is dripping continuously, needs immediate attention",
        category: "plumbing",
        priority: "high",
        status: "in_progress",
        reportedBy: "tenant-1",
        assignedTo: "contractor-1",
        estimatedCost: "250",
        actualCost: null,
        createdAt: new Date(),
        completedAt: null,
      },
      {
        id: "ticket-2",
        ticketNumber: "MT-2024-002",
        propertyId: "property-2",
        unitId: "unit-2",
        title: "HVAC system maintenance",
        description: "Regular maintenance required for HVAC system",
        category: "hvac",
        priority: "medium",
        status: "scheduled",
        reportedBy: "manager-1",
        assignedTo: "contractor-2",
        estimatedCost: "500",
        actualCost: null,
        createdAt: new Date(),
        completedAt: null,
      },
    ];

    tickets.forEach(ticket => {
      this.maintenanceTickets.set(ticket.id, ticket as MaintenanceTicket);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      role: insertUser.role || "tenant",
      email: insertUser.email,
      password: insertUser.password,
      firstName: insertUser.firstName,
      lastName: insertUser.lastName,
      companyId: insertUser.companyId || null,
      profileImage: insertUser.profileImage || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Company operations
  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = {
      id,
      type: insertCompany.type,
      name: insertCompany.name,
      address: insertCompany.address || null,
      email: insertCompany.email || null,
      phone: insertCompany.phone || null,
      createdAt: new Date(),
    };
    this.companies.set(id, company);
    return company;
  }

  // Property operations
  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getPropertiesByCompany(companyId: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.companyId === companyId);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = {
      id,
      name: insertProperty.name,
      address: insertProperty.address,
      type: insertProperty.type,
      companyId: insertProperty.companyId,
      managementType: insertProperty.managementType,
      totalUnits: insertProperty.totalUnits || null,
      imageUrl: insertProperty.imageUrl || null,
      annualLevy: insertProperty.annualLevy || null,
      complianceRate: insertProperty.complianceRate || null,
      createdAt: new Date(),
    };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
    const property = this.properties.get(id);
    if (!property) throw new Error("Property not found");
    
    const updatedProperty: Property = { ...property, ...updates };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  // Unit operations
  async getUnit(id: string): Promise<Unit | undefined> {
    return this.units.get(id);
  }

  async getUnits(): Promise<Unit[]> {
    return Array.from(this.units.values());
  }

  async getUnitsByProperty(propertyId: string): Promise<Unit[]> {
    return Array.from(this.units.values()).filter(u => u.propertyId === propertyId);
  }

  async createUnit(insertUnit: InsertUnit): Promise<Unit> {
    const id = randomUUID();
    const unit: Unit = {
      id,
      type: insertUnit.type,
      propertyId: insertUnit.propertyId,
      unitNumber: insertUnit.unitNumber,
      size: insertUnit.size || null,
      bedrooms: insertUnit.bedrooms || null,
      bathrooms: insertUnit.bathrooms || null,
      monthlyRent: insertUnit.monthlyRent || null,
      isOccupied: insertUnit.isOccupied || null,
      tenantId: insertUnit.tenantId || null,
      ownerId: insertUnit.ownerId || null,
      createdAt: new Date(),
    };
    this.units.set(id, unit);
    return unit;
  }

  async updateUnit(id: string, updates: Partial<Unit>): Promise<Unit> {
    const unit = this.units.get(id);
    if (!unit) throw new Error("Unit not found");
    
    const updatedUnit: Unit = { ...unit, ...updates };
    this.units.set(id, updatedUnit);
    return updatedUnit;
  }

  // Maintenance operations
  async getMaintenanceTicket(id: string): Promise<MaintenanceTicket | undefined> {
    return this.maintenanceTickets.get(id);
  }

  async getMaintenanceTickets(): Promise<MaintenanceTicket[]> {
    return Array.from(this.maintenanceTickets.values());
  }

  async getMaintenanceTicketsByProperty(propertyId: string): Promise<MaintenanceTicket[]> {
    return Array.from(this.maintenanceTickets.values()).filter(t => t.propertyId === propertyId);
  }

  async createMaintenanceTicket(insertTicket: InsertMaintenanceTicket): Promise<MaintenanceTicket> {
    const id = randomUUID();
    const ticketNumber = `MT-${new Date().getFullYear()}-${String(this.maintenanceTickets.size + 1).padStart(3, '0')}`;
    const ticket: MaintenanceTicket = {
      id,
      ticketNumber,
      propertyId: insertTicket.propertyId,
      unitId: insertTicket.unitId || null,
      title: insertTicket.title,
      description: insertTicket.description,
      category: insertTicket.category,
      priority: insertTicket.priority || "medium",
      status: insertTicket.status || "open",
      reportedBy: insertTicket.reportedBy,
      assignedTo: insertTicket.assignedTo || null,
      estimatedCost: insertTicket.estimatedCost || null,
      actualCost: insertTicket.actualCost || null,
      createdAt: new Date(),
      completedAt: insertTicket.completedAt || null,
    };
    this.maintenanceTickets.set(id, ticket);
    return ticket;
  }

  async updateMaintenanceTicket(id: string, updates: Partial<MaintenanceTicket>): Promise<MaintenanceTicket> {
    const ticket = this.maintenanceTickets.get(id);
    if (!ticket) throw new Error("Maintenance ticket not found");
    
    const updatedTicket: MaintenanceTicket = { ...ticket, ...updates };
    this.maintenanceTickets.set(id, updatedTicket);
    return updatedTicket;
  }

  // Inspection operations
  async getInspection(id: string): Promise<Inspection | undefined> {
    return this.inspections.get(id);
  }

  async getInspections(): Promise<Inspection[]> {
    return Array.from(this.inspections.values());
  }

  async getInspectionsByProperty(propertyId: string): Promise<Inspection[]> {
    return Array.from(this.inspections.values()).filter(i => i.propertyId === propertyId);
  }

  async createInspection(insertInspection: InsertInspection): Promise<Inspection> {
    const id = randomUUID();
    const inspection: Inspection = {
      id,
      propertyId: insertInspection.propertyId,
      unitId: insertInspection.unitId || null,
      type: insertInspection.type,
      scheduledDate: insertInspection.scheduledDate,
      completedDate: insertInspection.completedDate || null,
      inspectorId: insertInspection.inspectorId,
      status: insertInspection.status || "scheduled",
      findings: insertInspection.findings || null,
      reportUrl: insertInspection.reportUrl || null,
      createdAt: new Date(),
    };
    this.inspections.set(id, inspection);
    return inspection;
  }

  async updateInspection(id: string, updates: Partial<Inspection>): Promise<Inspection> {
    const inspection = this.inspections.get(id);
    if (!inspection) throw new Error("Inspection not found");
    
    const updatedInspection: Inspection = { ...inspection, ...updates };
    this.inspections.set(id, updatedInspection);
    return updatedInspection;
  }

  // Transaction operations
  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  async getTransactionsByProperty(propertyId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(t => t.propertyId === propertyId);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      id,
      propertyId: insertTransaction.propertyId || null,
      unitId: insertTransaction.unitId || null,
      type: insertTransaction.type,
      category: insertTransaction.category,
      amount: insertTransaction.amount,
      description: insertTransaction.description,
      paymentMethod: insertTransaction.paymentMethod || null,
      reference: insertTransaction.reference || null,
      status: insertTransaction.status || "pending",
      dueDate: insertTransaction.dueDate || null,
      paidDate: insertTransaction.paidDate || null,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactions.get(id);
    if (!transaction) throw new Error("Transaction not found");
    
    const updatedTransaction: Transaction = { ...transaction, ...updates };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  // Compliance operations
  async getComplianceItem(id: string): Promise<ComplianceItem | undefined> {
    return this.complianceItems.get(id);
  }

  async getComplianceItems(): Promise<ComplianceItem[]> {
    return Array.from(this.complianceItems.values());
  }

  async getComplianceItemsByProperty(propertyId: string): Promise<ComplianceItem[]> {
    return Array.from(this.complianceItems.values()).filter(c => c.propertyId === propertyId);
  }

  async createComplianceItem(insertItem: InsertComplianceItem): Promise<ComplianceItem> {
    const id = randomUUID();
    const item: ComplianceItem = {
      id,
      propertyId: insertItem.propertyId,
      title: insertItem.title,
      description: insertItem.description || null,
      category: insertItem.category,
      dueDate: insertItem.dueDate,
      completedDate: insertItem.completedDate || null,
      status: insertItem.status || "pending",
      assignedTo: insertItem.assignedTo || null,
      documents: insertItem.documents || null,
      createdAt: new Date(),
    };
    this.complianceItems.set(id, item);
    return item;
  }

  async updateComplianceItem(id: string, updates: Partial<ComplianceItem>): Promise<ComplianceItem> {
    const item = this.complianceItems.get(id);
    if (!item) throw new Error("Compliance item not found");
    
    const updatedItem: ComplianceItem = { ...item, ...updates };
    this.complianceItems.set(id, updatedItem);
    return updatedItem;
  }

  // Communication operations
  async getCommunication(id: string): Promise<Communication | undefined> {
    return this.communications.get(id);
  }

  async getCommunications(): Promise<Communication[]> {
    return Array.from(this.communications.values());
  }

  async getCommunicationsByUser(userId: string): Promise<Communication[]> {
    return Array.from(this.communications.values()).filter(c => 
      c.fromUserId === userId || c.toUserId === userId
    );
  }

  async createCommunication(insertCommunication: InsertCommunication): Promise<Communication> {
    const id = randomUUID();
    const communication: Communication = {
      id,
      type: insertCommunication.type,
      subject: insertCommunication.subject,
      message: insertCommunication.message,
      fromUserId: insertCommunication.fromUserId,
      toUserId: insertCommunication.toUserId || null,
      propertyId: insertCommunication.propertyId || null,
      status: insertCommunication.status || "sent",
      createdAt: new Date(),
    };
    this.communications.set(id, communication);
    return communication;
  }
}

export const storage = new MemStorage();
