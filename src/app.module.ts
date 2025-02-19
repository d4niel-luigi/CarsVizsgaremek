import { Module } from '@nestjs/common';
import { AuthModule } from '../src/user/auth.module';
import { PrismaService } from 'src/prisma.service';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';

@Module({
  imports: [AuthModule],
  controllers: [CarsController, BookingController],
  providers: [CarsService, BookingService, PrismaService],
})
export class AppModule {}
