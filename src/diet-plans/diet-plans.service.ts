import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DietPlan } from './diet-plan.entity';
import { CreateDietPlanDto } from './dto/create-diet-plan.dto';

@Injectable()
export class DietPlansService {
  constructor(
    @InjectRepository(DietPlan)
    private dietPlansRepository: Repository<DietPlan>,
  ) {}

  findAll(): Promise<DietPlan[]> {
    return this.dietPlansRepository.find();
  }

  create(createDietPlanDto: CreateDietPlanDto): Promise<DietPlan> {
    const dietPlan = this.dietPlansRepository.create(createDietPlanDto);
    return this.dietPlansRepository.save(dietPlan);
  }
}
