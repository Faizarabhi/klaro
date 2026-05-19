# Klaro Backend API

Klaro est une solution de gestion des demandes d'aides financieres. Ce backend expose une API NestJS robuste, typee et concentree sur les regles metier.

## Demo Screenshots


https://github.com/user-attachments/assets/c47b128f-686a-4b4b-bb67-08fa25461114


## Stack technique
- Framework: NestJS
- Langage: TypeScript
- Base de donnees: PostgreSQL
- ORM: TypeORM
- Validation: class-validator + class-transformer
- Documentation API: Swagger (OpenAPI)

## Fonctionnalites implementees
- Prefixe global API: `/api`
- Validation stricte des DTO via `ValidationPipe`
- Documentation interactive Swagger
- Gestion d'erreurs HTTP coherente
- Filtres + pagination sur la liste des demandes
- Regles de transitions de statut appliquees cote metier

## Installation et demarrage

### Prerequis
- Node.js (v18+)
- PostgreSQL lance

### Lancement
1. Installer les dependances:
```bash
npm ci
```

2. Configurer le fichier `.env`:
- `DB_HOST`
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`

3. Demarrer en mode developpement:
```bash
npm run start:dev
```

### URLs utiles
- API: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/api-docs`

## Endpoints

### 1) `POST /aid-requests`
Creation d'une demande d'aide.
- Statut initial force a `PENDING`

### 2) `GET /aid-requests`
Liste des demandes avec filtres et pagination.

Filtres optionnels:
- `beneficiaryId`
- `status`

Pagination:
- `page` (defaut: 1)
- `limit` (defaut: 10, max: 100)

Format de reponse:
- `data`
- `total`
- `page`
- `limit`
- `totalPages`

### 3) `PATCH /aid-requests/:id/status`
Mise a jour de statut avec validation stricte des transitions.

## Regles metier implementees
1. Le montant doit etre strictement positif et plafond a 5000 EUR.
2. Transitions autorisees uniquement:
   - `PENDING` -> `UNDER_REVIEW` ou `REJECTED`
   - `UNDER_REVIEW` -> `APPROVED` ou `REJECTED`
3. Un beneficiaire ne peut pas avoir plus de 2 demandes actives simultanees (`PENDING` ou `UNDER_REVIEW`).

## Gestion des erreurs
- Erreurs de validation DTO -> HTTP 400
- Transition de statut invalide -> HTTP 400 avec message explicite
- Ressource introuvable (id inconnu) -> HTTP 404

## Tests

### Unitaires
```bash
npm test -- --runInBand
```

Couverture metier principale:
1. Limite de 2 demandes actives.
2. Transition valide `PENDING` -> `UNDER_REVIEW`.
3. Transition invalide `PENDING` -> `APPROVED`.
4. Cas introuvable lors de la mise a jour de statut.

### End-to-end
```bash
npm run test:e2e
```

Scenario e2e implemente:
- creation d'une demande
- refus de `PENDING` -> `APPROVED` (400)
- acceptation de `PENDING` -> `UNDER_REVIEW`
- acceptation de `UNDER_REVIEW` -> `APPROVED`

## Choix techniques et compromis

### Pourquoi TypeORM ici
- Tres bon compromis pour un test technique time-boxe.
- Entites typees, repository pattern, et pagination rapide a mettre en place.
- Logique metier lisible dans la couche service.

### Architecture retenue
- Separation claire modules / controller / service / DTO / entity.
- Les regles metier critiques restent centralisees dans le service backend.

## Partie 3 - Reflexion technique

### 1) Migration Angular 15 vers 19
Le point delicat principal est le changement de paradigme vers Signals et l'evolution de l'ecosysteme (standalone, zone-less), plus le risque de regression lie aux librairies tierces.

Approche recommandee:
1. Mettre a jour Angular CLI + TypeScript.
2. Migrer progressivement vers les Standalone Components.
3. Introduire Signals de facon incrementale sur les zones a forte valeur (etat UI, derivees locales).
4. Mesurer les regressions (perf + tests) a chaque etape.

### 2) Hasura + NestJS
Compromis pragmatique:
- Hasura accelere les besoins CRUD/filtrage/aggregation en lecture.
- NestJS conserve la maitrise des regles metier critiques, des transitions de statut, de la securite et de l'orchestration.

Application au test:
- Les ecritures metier sensibles (transitions) resteraient cote NestJS.
- Les lectures riches et fortement filtrables pourraient etre deleguees a Hasura.

### 3) RxJS vs Signals vs NgRx
Recommandation progressive:
- Signals pour l'etat local UI.
- RxJS conserve pour les flux asynchrones reseau.
- Une couche de data-fetching dediee (par ex. TanStack Query) peut reduire la complexite du cache, du loading et de l'invalidation.

Cette combinaison aide a limiter les abonnements manuels, clarifier le code et reduire les regressions de maintenance.
