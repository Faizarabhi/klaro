import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AidRequestService } from './aid-request.service';
import { CreateAidRequestDto } from './dto/create-aid-request.dto';
import { UpdateAidRequestStatusDto } from './dto/update-aid-request-status.dto';
import { ListAidRequestsQueryDto } from './dto/list-aid-requests-query.dto';

@Controller('aid-requests')
export class AidRequestController {
  constructor(private readonly aidRequestService: AidRequestService) {}

  @Post()
  create(@Body() createAidRequestDto: CreateAidRequestDto) {
    return this.aidRequestService.create(createAidRequestDto);
  }

  @Get()
  findAll(@Query() query: ListAidRequestsQueryDto) {
    return this.aidRequestService.findAll(query);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStatusDto: UpdateAidRequestStatusDto,
  ) {
    return this.aidRequestService.updateStatus(id, updateStatusDto.status);
  }
}
