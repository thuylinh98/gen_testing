import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { MailerService } from './mailer.service';

@Controller('mailer')
@ApiTags('mailer')
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sendToPatient')
  async sendMail(@Body() { patient }: any): Promise<boolean> {
    try {
      const user = await this.usersService.findOne({
        query: { _id: patient },
      });

      await this.mailerService.sendMailToPatient({ user });

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
