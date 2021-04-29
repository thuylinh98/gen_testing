export interface GetMailTemplate {
  htmlTemplate: string;
  replacements?: any;
}

export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}
