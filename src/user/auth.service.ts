import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  // Felhasználó bejelentkezés
  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Felhasználó regisztráció
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser({
      email,
      password: hashedPassword,
    });

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
