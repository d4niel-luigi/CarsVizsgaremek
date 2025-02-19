import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Felhasználó regisztrálása
   * @param createUserDto A felhasználó regisztrációs adatainak megadása
   * @returns Az új felhasználó
   */
  @Post('register')
  @ApiResponse({ status: 201, description: 'Felhasználó regisztrálása sikeres' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  /**
   * Felhasználó bejelentkezése
   * @param loginUserDto A felhasználó bejelentkezési adatai
   * @returns JWT token, ha sikeres a bejelentkezés
   */
  @Post('login')
  @ApiResponse({ status: 200, description: 'Bejelentkezés sikeres' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  /**
   * Bejelentkezett felhasználó adatainak lekérése
   * @returns A bejelentkezett felhasználó adatai
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'A felhasználó adatai sikeresen lekérdezve' })
  getProfile(@Request() req) {
    return req.user;
  }
}
