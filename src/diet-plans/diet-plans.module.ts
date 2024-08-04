import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DietPlansService } from './diet-plans.service';
import { DietPlansController } from './diet-plans.controller';
import { DietPlan } from './diet-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DietPlan])],
  providers: [DietPlansService],
  controllers: [DietPlansController],
})
export class DietPlansModule {}
