import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AidRequestService } from './aid-request.service';
import { AidRequestController } from './aid-request.controller';
import { AidRequest } from './entities/aid-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AidRequest])],
  controllers: [AidRequestController],
  providers: [AidRequestService],
  exports: [AidRequestService],
})
export class AidRequestModule {}
