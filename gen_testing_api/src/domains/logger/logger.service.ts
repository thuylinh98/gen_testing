import { LoggerService } from '@nestjs/common';
import {
  createLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';
import { TransformableInfo } from 'logform';

export const logTransportConsole = new transports.Console({
  handleExceptions: true,
  format: format.combine(
    format.timestamp(),
    format.printf((info: TransformableInfo) => {
      let log = '';
      if (info.timestamp) {
        log += `${info.timestamp} `;
      }
      if (info.meta && info.meta.context) {
        log += `${info.meta.context} `;
      }
      if (info.level) {
        log += `[${info.level.toLocaleUpperCase()}] `;
      }
      if (info.message) {
        log += `${info.message}`;
      }

      return log;
    }),
  ),
});

export class MyLogger implements LoggerService {
  private readonly logger: Logger;
  private contextName: string;

  constructor(context: string) {
    this.contextName = context;
    this.logger = createLogger();
    this.logger.configure({
      transports: [logTransportConsole],
      exitOnError: false,
    });
  }

  public configure(configuration: LoggerOptions, contextName?: string): void {
    this.logger.configure(configuration);
    this.contextName = contextName ? contextName : this.contextName;
  }

  public log(message: string): void {
    this.logger.log({
      level: 'info',
      message,
      meta: {
        context: this.contextName,
      },
    });
  }

  public error(message: string, stackTrace?: string): void {
    this.logger.log({
      level: 'error',
      message,
      meta: { context: this.contextName, stackTrace },
    });
  }

  public warn(message: string): void {
    this.logger.log({
      level: 'warn',
      message,
      meta: { context: this.contextName },
    });
  }

  public info(message: string): void {
    this.logger.log({
      level: 'info',
      message,
      meta: { context: this.contextName },
    });
  }
}
