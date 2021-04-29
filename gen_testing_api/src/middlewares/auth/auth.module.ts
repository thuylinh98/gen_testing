import { Module, forwardRef, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../../domains/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '../../configs/configs.module';

@Global()
@Module({
  imports: [PassportModule, forwardRef(() => UsersModule), ConfigModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
