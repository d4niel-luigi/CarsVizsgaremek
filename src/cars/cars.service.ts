import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Minden autó lekérése
   * @returns JSON válasz az autókról
   */
  async findAll() {
    return this.prisma.car.findMany();
  }

  /**
   * Egy autó lekérése ID alapján
   * @param id Az autó egyedi azonosítója
   * @returns JSON válasz az autóról
   */
  async findOne(id: number) {
    return this.prisma.car.findUnique({
      where: { id },
    });
  }
}
