import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>,
  ) {}

  findAll(): Promise<Workout[]> {
    return this.workoutsRepository.find();
  }

  create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    const workout = this.workoutsRepository.create(createWorkoutDto);
    return this.workoutsRepository.save(workout);
  }
}
