# Klaro Backend API

Klaro is a solution designed to streamline the management of aid requests. This backend provides a robust, scalable, and type-safe API built with NestJS.

## 🚀 Tech Stack
- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **Database/ORM:** PostgreSQL with TypeORM
- **API Documentation:** Swagger (OpenAPI)
- **Validation:** class-validator & class-transformer

## 🛠️ Features
- **Centralized API:** Global prefix `/api` for all routes.
- **Data Integrity:** Strict input validation using DTOs and pipes.
- **Automatic Documentation:** Fully interactive API documentation via Swagger.
- **Error Handling:** Standardized HTTP response patterns.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/Faizarabhi/klaro/](https://github.com/Faizarabhi/klaro/)
   cd klaro-backend
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run start:dev
📖 API Documentation
Once the server is running, access the interactive Swagger documentation at:
http://localhost:3000/api-docs

💡 Key Technical Decisions
Modularity: Applied a domain-driven structure (Modules/Controllers/Services) for maintainability.

Validation: Implemented ValidationPipe to ensure data cleanliness at the edge.

Type Safety: Used TypeScript interfaces and DTOs to bridge the gap between frontend requests and database entities.