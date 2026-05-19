# Klaro Backend (Aid Requests Module)

## Stack and Technical Choices
- Framework: NestJS + TypeScript
- Data access: TypeORM with PostgreSQL
- Validation: class-validator and class-transformer via global ValidationPipe
- API docs: Swagger at /api-docs

Why TypeORM:
- It provides a pragmatic balance for this technical test: typed entities, repository API, and easy pagination/filter implementation.
- It keeps business logic readable in the service layer while staying close to SQL behavior.

## Run the API
1. Install dependencies:
   - npm ci
2. Configure environment in .env:
   - DB_HOST
   - DB_PORT
   - DB_USERNAME
   - DB_PASSWORD
   - DB_NAME
3. Start in dev mode:
   - npm run start:dev

API base URL:
- http://localhost:3000/api

Swagger:
- http://localhost:3000/api-docs

## Endpoints
1. POST /aid-requests
- Creates a new aid request
- Initial status is PENDING

2. GET /aid-requests
- Filters:
  - beneficiaryId (optional)
  - status (optional)
- Pagination:
  - page (optional, default 1)
  - limit (optional, default 10, max 100)
- Response shape:
  - data
  - total
  - page
  - limit
  - totalPages

3. PATCH /aid-requests/:id/status
- Updates request status with transition validation

## Business Rules Implemented
1. Amount must be strictly positive and capped at 5000 EUR.
2. Allowed transitions only:
   - PENDING -> UNDER_REVIEW or REJECTED
   - UNDER_REVIEW -> APPROVED or REJECTED
3. A beneficiary cannot have more than 2 active requests simultaneously (PENDING or UNDER_REVIEW).

## Error Handling
- Validation errors return coherent 400 responses.
- Invalid status transitions return 400 with explicit message.
- Unknown request id in status update returns 404.

## Tests
Run unit tests:
- npm test -- --runInBand

Current service tests cover:
1. Active request limit enforcement.
2. Valid transition PENDING -> UNDER_REVIEW.
3. Invalid transition PENDING -> APPROVED.
4. Not found behavior on status update.
