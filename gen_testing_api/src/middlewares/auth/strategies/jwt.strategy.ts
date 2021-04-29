import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../../configs/configs.service';
import { ReqUser } from '../types/auth.interface';
import { UsersService } from '../../../domains/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: any): Promise<ReqUser> {
    try {
      const userData: any = await this.usersService.getCurrentUserCredentials({
        _id: payload._id,
      });

      if (!userData) {
        throw new UnauthorizedException();
      }

      if (userData.status === 'INACTIVE') {
        throw new UnauthorizedException(
          'You need to activate your account by confirming your email',
        );
      }

      return {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        status: userData.status,
        role: userData.role,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
