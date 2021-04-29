import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from '../../domains/users/users.service';
import { AccessToken, TokenPayload } from './types/auth.interface';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from '../../configs/configs.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getCurrentUserCredentials({
      username,
    });

    if (user.status === 'INACTIVE') {
      return null;
    }

    const isValid = user && (await bcrypt.compare(password, user.password));

    if (isValid) {
      delete user.password;
      return user;
    }

    return null;
  }

  async generateJWT(user: any): Promise<AccessToken> {
    const payload: TokenPayload = {
      _id: user._id.toString(),
      status: user.status,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const accessToken = jsonwebtoken.sign(
      payload,
      this.configService.jwtSecret,
      { expiresIn: '180d' },
    );

    return {
      accessToken,
    };
  }
}
