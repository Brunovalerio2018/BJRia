import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from './auth.guard';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constantes';
import { AutorizacaoService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AutorizacaoService, AuthGuard, JwtStrategy],
  exports: [AutorizacaoService, AuthGuard, JwtModule], // <-- exporta o JwtModule
})
export class AuthModule {}
