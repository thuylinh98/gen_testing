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

export class CreateGenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly property: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly affect: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

export class UpdateGenDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly type?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly property?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly affect?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly content?: string;
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
  readonly createdAt?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly cursor?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly type?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly property?: string;
}
