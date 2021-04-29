import {
  InternalServerErrorException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { forbiddenErrors } from '../constants/errors';

interface Error {
  message?: string;
  stack?: string;
  code?: string | number;
  name?: string;
}

export const checkControllerErrors = (error: Error): void => {
  if (error.code === 11000 && error.name === 'MongoError') {
    console.log(`${error.message} - ${error.stack}`);
    throw new BadRequestException('Duplicated email');
  }

  if (error.code === 403) {
    console.log(`${error.message} - ${error.stack}`);
    throw new ForbiddenException(forbiddenErrors[error.name]);
  }

  if (error.code === 404) {
    console.log(`${error.message} - ${error.stack}`);
    throw new NotFoundException(error);
  }

  if (error.code === 400) {
    console.log(`${error.message} - ${error.stack}`);
    throw new BadRequestException(error);
  }

  console.log(`${error.message} - ${error.stack}`);

  throw new InternalServerErrorException({
    error: `${error.message} - ${error.stack}`,
  });
};
