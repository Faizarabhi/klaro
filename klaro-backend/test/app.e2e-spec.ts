import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { randomUUID } from 'crypto';

describe('AidRequest API (e2e)', () => {
  let app: INestApplication<App>;
  let createdAidRequestId = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('should reject invalid transition and accept valid transition sequence', async () => {
    const beneficiaryId = randomUUID();

    const createResponse = await request(app.getHttpServer())
      .post('/api/aid-requests')
      .send({
        beneficiaryId,
        category: 'FOOD',
        amount: 120,
        description: 'Aide alimentaire ponctuelle pour ce mois.',
      })
      .expect(201);

    createdAidRequestId = createResponse.body.id;

    await request(app.getHttpServer())
      .patch(`/api/aid-requests/${createdAidRequestId}/status`)
      .send({ status: 'APPROVED' })
      .expect(400);

    await request(app.getHttpServer())
      .patch(`/api/aid-requests/${createdAidRequestId}/status`)
      .send({ status: 'UNDER_REVIEW' })
      .expect(200);

    await request(app.getHttpServer())
      .patch(`/api/aid-requests/${createdAidRequestId}/status`)
      .send({ status: 'APPROVED' })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
