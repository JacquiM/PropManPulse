# PropManPulse - Property Management System

## Overview

PropManPulse is a comprehensive property management platform designed to handle multiple management types including community schemes (Body Corporate & HOA), rental properties, maintenance operations, and compliance tracking. The application features a modern React frontend with TypeScript, a Node.js/Express backend, and PostgreSQL database integration via Drizzle ORM. The system provides role-based access control and supports different user types including administrators, managers, property owners, and tenants.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Context-based authentication with localStorage persistence

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Build Tool**: ESBuild for production bundling
- **Development**: TSX for TypeScript execution in development

### Database Design
- **Schema Structure**: Shared schema definitions between frontend and backend
- **Key Entities**: Users, Companies, Properties, Units, Maintenance Tickets, Inspections, Transactions, Compliance Items, Communications
- **Relationships**: Multi-tenant architecture supporting different company types and property management models
- **Validation**: Zod schemas for runtime type checking and data validation

### Authentication & Authorization
- **Authentication Method**: Simple email/password authentication with user session storage
- **Role-Based Access**: Four user roles (admin, manager, owner, tenant) with hierarchical permissions
- **Session Management**: Client-side session persistence using localStorage
- **API Security**: Request/response middleware for logging and error handling

### Development Workflow
- **Monorepo Structure**: Unified TypeScript configuration across client, server, and shared directories
- **Hot Reloading**: Vite development server with HMR for frontend development
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Type Safety**: Shared type definitions between frontend and backend

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/\***: Accessible UI component primitives
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database schema management and migrations

### Development Tools
- **Vite**: Frontend build tool and development server
- **ESBuild**: Backend bundling for production
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first CSS framework

### File Upload & Storage
- **@google-cloud/storage**: Google Cloud Storage integration
- **@uppy/\***: Modern file uploader components

### Form Handling & Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation and schema definition

### UI Enhancement
- **date-fns**: Date manipulation and formatting
- **wouter**: Lightweight client-side routing
- **class-variance-authority**: Utility for managing CSS class variants