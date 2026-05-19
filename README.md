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

💡 Partie 3 : Réflexion technique

1. Migration Angular 15 vers 19 : Le défi de la modernité
Les obstacles : Ce qui me semble le plus délicat, c'est le changement de paradigme. Passer d'une architecture centrée sur Zone.js vers le modèle réactif des Signals demande une vraie gymnastique intellectuelle. Il y a aussi le risque de "cassure" lors de la mise à jour des librairies tierces, et le besoin d'être très rigoureux sur la gestion du Change Detection pour garder une appli performante.

Ma stratégie : J'aime y aller par étapes pour ne rien casser. Je commence par mettre à jour le CLI et la stack TypeScript, puis je migre progressivement mes modules vers les Standalone Components (c'est le socle). Enfin, je remplace petit à petit les Observables par des Signals là où c'est pertinent, sans pour autant tout révolutionner d'un coup.

2. Hasura + NestJS : Choisir le bon outil
Le compromis : Pour moi, Hasura est un accélérateur incroyable pour les fonctionnalités "standard" (CRUD complexe, filtres dynamiques, abonnements GraphQL). NestJS, c'est là où je garde le contrôle pour les règles métier critiques et complexes.

Exemple concret : Dans ce test, si nous avions des centaines de requêtes avec des filtres complexes ou des agrégations de données, j'aurais délégué la partie lecture à Hasura pour gagner du temps et de la performance, tout en gardant NestJS pour valider strictement les règles métier (comme les transitions de statut) et la sécurité.

3. RxJS vs Signals vs NgRx : Vers une stack plus robuste
Ma proposition : Si l'équipe veut monter en gamme, je suis très fan de l'approche Angular Signals couplée à TanStack Query (ou NgRx Data).

Pourquoi ? On arrête de se battre avec les subscribe/unsubscribe et les memory leaks inhérents à BehaviorSubject. Les Signals sont tellement plus naturels à lire et à maintenir ! Quant à TanStack Query, il nous enlève une énorme épine du pied : il gère le cache, l'état de chargement et la synchronisation avec le serveur de façon native. C'est beaucoup plus propre et proactif qu'un BehaviorSubject fait main qui finit souvent par devenir une "usine à gaz".