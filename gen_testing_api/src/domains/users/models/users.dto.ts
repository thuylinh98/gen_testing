import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export const status = ['INACTIVE', 'ACTIVE'];

export const role = ['DOCTOR', 'PATIENT', 'ADMIN'];

export const sortBy = ['_id', 'fullname', 'createdBy', 'createdAt'];

export const sortDirection = ['ASC', 'DESC'];
export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @ApiPropertyOptional()
  @IsEnum(status)
  readonly status?: string;

  @ApiPropertyOptional()
  @IsEnum(role)
  readonly role?: string;
}

export class FindManyDto {
  @IsNumberString()
  @IsOptional()
  readonly limit?: string;

  @IsEnum(sortBy)
  @IsOptional()
  readonly sortBy?: string = '_id';

  @IsEnum(sortDirection)
  @IsOptional()
  readonly sortDirection?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly cursor?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly fullname?: string;

  @IsEnum(role)
  @IsOptional()
  readonly role?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly createBy?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly fullname?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly password?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;

  @ApiPropertyOptional()
  @IsEnum(status)
  @IsOptional()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsEnum(role)
  @IsOptional()
  readonly role?: string;
}
