import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressTrackingService } from './progress-tracking.service';
import { ProgressTrackingController } from './progress-tracking.controller';
import { ProgressLog } from './progress-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressLog])],
  providers: [ProgressTrackingService],
  controllers: [ProgressTrackingController],
})
export class ProgressTrackingModule {}
