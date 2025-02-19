import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Felhasználó új foglalásának létrehozása
   * @param createBookingDto A foglalás adatai
   * @returns JSON válasz a létrehozott foglalásról
   */
  async create(createBookingDto: { carId: number, userId: number, startDate: string, endDate: string }) {
    return await this.prisma.booking.create({
      data: {
        carId: createBookingDto.carId,
        userId: createBookingDto.userId,
        startDate: new Date(createBookingDto.startDate),
        endDate: new Date(createBookingDto.endDate),
      },
    });
  }

  /**
   * Felhasználó foglalásainak lekérése
   * @param userId A felhasználó ID-ja
   * @returns JSON válasz a felhasználó foglalásairól
   */
  async findByUser(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        car: true,
      },
    });
  }

  /**
   * Admin számára az összes foglalás lekérése
   * @returns JSON válasz az összes foglalásról
   */
  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        car: true,
        user: true,
      },
    });
  }
}
