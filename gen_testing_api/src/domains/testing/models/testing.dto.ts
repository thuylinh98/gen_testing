import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export const sortBy = ['_id', 'createdBy', 'createdAt'];

export const sortDirection = ['ASC', 'DESC'];

export class CreateTestingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly patient?: string;
}

export class FindManyDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly patient?: string;

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
  readonly createdAt?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly cursor?: string;
}

export class UpdateTestingDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly patient?: string;
}
