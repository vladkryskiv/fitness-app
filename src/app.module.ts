import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { DietPlansModule } from './diet-plans/diet-plans.module';
import { ProgressTrackingModule } from './progress-tracking/progress-tracking.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { User } from './users/user.entity';
import { Workout } from './workouts/workout.entity';
import { DietPlan } from './diet-plans/diet-plan.entity';
import { ProgressLog } from './progress-tracking/progress-log.entity';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { jwtConstants } from './auth/strategies/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Workout, DietPlan, ProgressLog],
      synchronize: true,
    }),
    UsersModule,
    WorkoutsModule,
    DietPlansModule,
    ProgressTrackingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,LocalStrategy, JwtStrategy, GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
