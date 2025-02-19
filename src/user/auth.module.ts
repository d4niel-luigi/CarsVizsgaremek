import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), // Betölti a .env fájlt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Itt hivatkozunk a környezeti változóra
        signOptions: { expiresIn: '60m' }, // A token érvényességi ideje (például 1 óra)
      }),
      inject: [ConfigService], // Injectáljuk a ConfigService-t, hogy hozzáférjünk a környezeti változókhoz
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class AuthModule {}
