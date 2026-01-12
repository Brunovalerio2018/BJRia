import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from './auth.guard';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constantes';
import { AutorizacaoService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AutorizacaoService, AuthGuard],
  exports: [AutorizacaoService, AuthGuard, JwtModule], // <-- exporta o JwtModule
})
export class AuthModule {}
