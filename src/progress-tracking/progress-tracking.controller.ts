import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProgressTrackingService } from './progress-tracking.service';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';

@Controller('progress-tracking')
export class ProgressTrackingController {
  constructor(private readonly progressTrackingService: ProgressTrackingService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.progressTrackingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProgressLogDto: CreateProgressLogDto) {
    return this.progressTrackingService.create(createProgressLogDto);
  }
}

