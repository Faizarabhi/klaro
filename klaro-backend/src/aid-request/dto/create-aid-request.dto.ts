import {
  IsEnum,
  IsNumber,
  IsPositive,
  Max,
  IsString,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { AidCategory } from '../entities/aid-request.entity';

export class CreateAidRequestDto {
  @IsUUID()
  @IsNotEmpty()
  beneficiaryId: string;

  @IsEnum(AidCategory)
  category: AidCategory;

  @IsNumber()
  @IsPositive({ message: 'Le montant doit être strictement positif.' })
  @Max(5000, { message: 'Le montant est plafonné à 5 000 €.' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
