import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { AidStatus } from '../entities/aid-request.entity';

export class ListAidRequestsQueryDto {
  @IsOptional()
  @IsUUID()
  beneficiaryId?: string;

  @IsOptional()
  @IsEnum(AidStatus, { message: 'Le statut fourni est invalide.' })
  status?: AidStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
