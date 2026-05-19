import { Test, TestingModule } from '@nestjs/testing';
import { AidRequestService } from './aid-request.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  AidRequest,
  AidStatus,
  AidCategory,
} from './entities/aid-request.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('AidRequestService', () => {
  let service: AidRequestService;
  let repository: Repository<AidRequest>;

  const mockRepository = {
    count: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AidRequestService,
        {
          provide: getRepositoryToken(AidRequest),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AidRequestService>(AidRequestService);
    repository = module.get<Repository<AidRequest>>(
      getRepositoryToken(AidRequest),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test de la règle des 2 demandes actives max
  it('should throw BadRequestException if beneficiary has 2 or more active requests', async () => {
    mockRepository.count.mockResolvedValue(2); // mock: déjà 2 demandes actives

    const dto = {
      beneficiaryId: 'test-uuid',
      category: AidCategory.HOUSING,
      amount: 1500,
      description: 'Demande urgente',
    };

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    expect(jest.spyOn(repository, 'count')).toHaveBeenCalled();
  });

  // test des transitions de statut invalides
  it('should throw BadRequestException for invalid status transition', async () => {
    const mockRequest = {
      id: 'request-uuid',
      status: AidStatus.PENDING,
    };
    mockRepository.findOne.mockResolvedValue(mockRequest);

    // essayer de passer de PENDING direct à APPROVED (invalide selon la règle)
    await expect(
      service.updateStatus('request-uuid', AidStatus.APPROVED),
    ).rejects.toThrow(BadRequestException);
  });
});
