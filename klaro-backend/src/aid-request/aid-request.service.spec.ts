import { Test, TestingModule } from '@nestjs/testing';
import { AidRequestService } from './aid-request.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  AidRequest,
  AidStatus,
  AidCategory,
} from './entities/aid-request.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AidRequestService', () => {
  let service: AidRequestService;
  let repository: Repository<AidRequest>;

  const mockRepository = {
    count: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
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

  it('should throw BadRequestException if beneficiary has 2 or more active requests', async () => {
    mockRepository.count.mockResolvedValue(2);

    const dto = {
      beneficiaryId: 'test-uuid',
      category: AidCategory.HOUSING,
      amount: 1500,
      description: 'Demande urgente',
    };

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    expect(jest.spyOn(repository, 'count')).toHaveBeenCalled();
  });

  it('should update status from PENDING to UNDER_REVIEW', async () => {
    const mockRequest: Partial<AidRequest> = {
      id: 'request-uuid',
      status: AidStatus.PENDING,
    };

    mockRepository.findOne.mockResolvedValue(mockRequest);
    mockRepository.save.mockImplementation(
      (request: AidRequest): AidRequest => request,
    );

    const updated = await service.updateStatus(
      'request-uuid',
      AidStatus.UNDER_REVIEW,
    );

    expect(updated.status).toBe(AidStatus.UNDER_REVIEW);
  });

  it('should throw BadRequestException for invalid status transition from PENDING to APPROVED', async () => {
    const mockRequest: Partial<AidRequest> = {
      id: 'request-uuid',
      status: AidStatus.PENDING,
    };

    mockRepository.findOne.mockResolvedValue(mockRequest);

    await expect(
      service.updateStatus('request-uuid', AidStatus.APPROVED),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException when request does not exist', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(
      service.updateStatus('missing-id', AidStatus.REJECTED),
    ).rejects.toThrow(NotFoundException);
  });
});
