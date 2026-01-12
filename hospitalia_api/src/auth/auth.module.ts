import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'bjria_secret_key',
      signOptions: { expiresIn: '8h' },
    }),
  ],
})
export class AuthModule {}
