import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync('.local.env'));
  }

  get port() {
    return parseInt(process.env.PORT, 10) || 5000;
  }

  get database() {
    return {
      uri: this.envConfig.DATABASE_URI,
    };
  }

  get bcryptSalt() {
    return Number(this.envConfig.BCRYPT_SALT);
  }

  get jwtSecret() {
    return this.envConfig.JWT_SECRET;
  }

  get banner() {
    return this.envConfig.BANNER;
  }

  get mailer() {
    return {
      user: this.envConfig.MAILER_USER,
      pass: this.envConfig.MAILER_PASS,
      service: this.envConfig.MAILER_SERVICE,
    };
  }
}
