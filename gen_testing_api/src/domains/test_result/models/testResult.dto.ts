import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export const sortBy = ['_id', 'createdBy', 'createdAt'];

export const sortDirection = ['ASC', 'DESC'];

export class Result {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly result?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly content?: string;
}

export class Recommend {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly recommend?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly content?: string;
}

export class Gen {
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

export class CreateTestResultDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  readonly results?: Result[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  readonly recommends?: Recommend[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  readonly gens?: Gen[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly testingId: string;
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
}

export class UpdateTestResultDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  readonly results?: Result[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  readonly recommends?: Recommend[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  readonly gens?: Gen[];
}
