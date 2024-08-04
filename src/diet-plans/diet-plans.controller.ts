import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DietPlansService } from './diet-plans.service';
import { CreateDietPlanDto } from './dto/create-diet-plan.dto';

@Controller('diet-plans')
export class DietPlansController {
  constructor(private readonly dietPlansService: DietPlansService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.dietPlansService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDietPlanDto: CreateDietPlanDto) {
    return this.dietPlansService.create(createDietPlanDto);
  }
}

