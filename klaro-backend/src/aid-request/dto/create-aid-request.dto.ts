import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ 
    description: 'ID unique du bénéficiaire', 
    example: '550e8400-e29b-41d4-a716-446655440000' 
  })
  @IsUUID()
  @IsNotEmpty()
  beneficiaryId: string;

  @ApiProperty({ description: 'Catégorie de la demande d\'aide', enum: AidCategory })
  @IsEnum(AidCategory)
  category: AidCategory;

  @ApiProperty({ description: "Montant de l'aide demandé", example: 1500, minimum: 1, maximum: 5000 })
  @IsNumber()
  @IsPositive({ message: 'Le montant doit être supérieur à 0.' })
  @Max(5000, { message: 'Le montant est plafonné à 5 000 €.' })
  amount: number;

  @ApiProperty({ description: "Description détaillée de la demande", example: "Besoin d'aide pour les frais scolaires" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
