import { IsEnum } from 'class-validator';
import { AidStatus } from '../entities/aid-request.entity';

export class UpdateAidRequestStatusDto {
  @IsEnum(AidStatus, { message: 'Statut invalide.' })
  status!: AidStatus;
}
