import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AidRequest, AidStatus } from './entities/aid-request.entity';
import { CreateAidRequestDto } from './dto/create-aid-request.dto';

@Injectable()
export class AidRequestService {
  constructor(
    @InjectRepository(AidRequest)
    private readonly aidRequestRepository: Repository<AidRequest>,
  ) {}

  async create(createDto: CreateAidRequestDto): Promise<AidRequest> {
    const activeRequests = await this.aidRequestRepository.count({
      where: [
        { beneficiaryId: createDto.beneficiaryId, status: AidStatus.PENDING },
        {
          beneficiaryId: createDto.beneficiaryId,
          status: AidStatus.UNDER_REVIEW,
        },
      ],
    });

    if (activeRequests >= 2) {
      throw new BadRequestException(
        'Un bénéficiaire ne peut pas avoir plus de 2 demandes actives (PENDING ou UNDER_REVIEW) simultanément.',
      );
    }

    const newRequest = this.aidRequestRepository.create(createDto);
    return this.aidRequestRepository.save(newRequest);
  }

  async updateStatus(id: string, newStatus: AidStatus): Promise<AidRequest> {
    const request = await this.aidRequestRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(
        `La demande d'aide avec l'ID ${id} est introuvable.`,
      );
    }

    const current = request.status;

    const isValidTransition =
      (current === AidStatus.PENDING &&
        (newStatus === AidStatus.UNDER_REVIEW ||
          newStatus === AidStatus.REJECTED ||
          newStatus === AidStatus.APPROVED)) ||
      (current === AidStatus.UNDER_REVIEW &&
        (newStatus === AidStatus.APPROVED || newStatus === AidStatus.REJECTED));

    if (!isValidTransition) {
      throw new BadRequestException(
        `Transition de statut invalide : impossible de passer de ${current} à ${newStatus}.`,
      );
    }

    request.status = newStatus;
    return this.aidRequestRepository.save(request);
  }

  async findAll(
    beneficiaryId?: string,
    status?: AidStatus,
  ): Promise<AidRequest[]> {
    const query: {
      beneficiaryId?: string;
      status?: AidStatus;
    } = {};

    if (beneficiaryId) query.beneficiaryId = beneficiaryId;
    if (status) query.status = status;

    return this.aidRequestRepository.find({
      where: query,
      order: { createdAt: 'DESC' },
    });
  }
}
