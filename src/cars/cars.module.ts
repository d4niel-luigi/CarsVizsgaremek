import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, PrismaService],
})
export class CarsModule {}
