import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@Controller('cars')
@ApiBearerAuth()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  /**
   * Minden autó lekérése
   * @returns JSON válasz
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Autók lekérdezése sikeres' })
  findAll() {
    return this.carsService.findAll();
  }

  /**
   * Egy autó lekérése ID alapján
   * @param id Az autó egyedi azonosítója
   * @returns JSON válasz
   */
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Az autó egyedi azonosítója' })
  @ApiResponse({ status: 200, description: 'Autó lekérdezése sikeres' })
  findOne(@Param('id') id: number) {
    return this.carsService.findOne(id);
  }
}
