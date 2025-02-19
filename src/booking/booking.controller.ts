import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@Controller('booking')
@ApiBearerAuth()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * Felhasználó új foglalásának létrehozása
   * @param createBookingDto A foglalás adatai
   * @returns JSON válasz
   */
  @Post()
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  create(@Body() createBookingDto: { carId: number, userId: number, startDate: string, endDate: string }) {
    return this.bookingService.create(createBookingDto);
  }

  /**
   * Felhasználó foglalásainak lekérése
   * @param userId A felhasználó ID-ja
   * @returns JSON válasz
   */
  @Get('user/:userId')
  @ApiParam({ name: 'userId', description: 'A felhasználó egyedi azonosítója' })
  @ApiResponse({ status: 200, description: 'Foglalások lekérdezése sikeres' })
  findByUser(@Param('userId') userId: number) {
    return this.bookingService.findByUser(userId);
  }

  /**
   * Admin számára az összes foglalás lekérése
   * @returns JSON válasz
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Minden foglalás lekérése sikeres' })
  findAll() {
    return this.bookingService.findAll();
  }
}
