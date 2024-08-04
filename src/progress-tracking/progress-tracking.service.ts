import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressLog } from './progress-log.entity';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';

@Injectable()
export class ProgressTrackingService {
  constructor(
    @InjectRepository(ProgressLog)
    private progressLogsRepository: Repository<ProgressLog>,
  ) {}

  findAll(): Promise<ProgressLog[]> {
    return this.progressLogsRepository.find();
  }

  create(createProgressLogDto: CreateProgressLogDto): Promise<ProgressLog> {
    const progressLog = this.progressLogsRepository.create(createProgressLogDto);
    return this.progressLogsRepository.save(progressLog);
  }
}
