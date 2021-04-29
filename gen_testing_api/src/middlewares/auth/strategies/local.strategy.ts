import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ReqUser } from '../types/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<ReqUser> {
    const userData = await this.authService.validateUser(email, password);

    if (!userData) {
      throw new UnauthorizedException();
    }

    return {
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      status: userData.status,
      role: userData.role,
    };
  }
}
