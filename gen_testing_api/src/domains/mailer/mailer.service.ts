import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { GetMailTemplate, MailOptions } from './types/mailer.interface';
import { ConfigService } from '../../configs/configs.service';
import { mailTemplate } from './templates/mailTemplate';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(mailOptions: MailOptions): Promise<any> {
    try {
      const config = this.configService.mailer;

      const transporter = nodemailer.createTransport({
        service: config.service,
        auth: {
          user: config.user,
          pass: config.pass,
        },
      });

      const sentResult = await transporter.sendMail(mailOptions);
      return sentResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getMailTemplate({
    htmlTemplate,
    replacements,
  }: GetMailTemplate): Promise<string> {
    try {
      const template = handlebars.compile(htmlTemplate);
      const bindingHtmlTemplate = template(replacements);

      return bindingHtmlTemplate;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async sendMailToPatient({ user }: any): Promise<any> {
    try {
      const html = await this.getMailTemplate({
        htmlTemplate: mailTemplate,
        replacements: {
          username: user.fullname,
        },
      });

      const mailOptions = {
        from: 'hoangtuanle2021@gmail.com',
        to: user.email,
        subject: 'Thông báo kết quả xet nghiệm',
        html,
      };

      const sentResult = await this.sendEmail(mailOptions);
      return sentResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
