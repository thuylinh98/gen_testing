import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { checkControllerErrors } from 'src/helpers/check_errors';
import { Scopes } from 'src/middlewares/authz/authz.service';
import { MyLogger } from '../logger/logger.service';
import { GensService } from './gens.service';
import { CreateGenDto, FindManyDto, UpdateGenDto } from './models/gens.dto';
import { FindManyResponse, Gen } from './types/gens.interface';

@Controller('gens')
@ApiTags('gens')
export class GensController {
  constructor(private readonly gensService: GensService) {}

  private logger = new MyLogger(GensController.name);

  @Post()
  @UseGuards(new Scopes(['ADMIN']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(
    @Request() { user },
    @Body() createOneDto: CreateGenDto,
  ): Promise<Gen> {
    try {
      const gen = await this.gensService.createOne({
        createOneGen: createOneDto,
        user,
      });

      return gen;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get()
  @UseGuards(new Scopes(['ADMIN', 'DOCTOR', 'PATIENT']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findMany(@Query() findManyDto: FindManyDto): Promise<FindManyResponse> {
    try {
      const gens = await this.gensService.findMany({
        query: findManyDto,
      });

      return gens;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get(':id')
  @UseGuards(new Scopes(['ADMIN', 'DOCTOR', 'PATIENT']))
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param() { id }): Promise<Gen> {
    try {
      const gen = await this.gensService.findOne({
        query: { _id: id },
      });

      return gen;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Put(':id')
  @UseGuards(new Scopes(['ADMIN']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOne(
    @Param() { id },
    @Body() updateOneDto: UpdateGenDto,
  ): Promise<Gen> {
    try {
      const gen = await this.gensService.updateOne({
        query: { _id: id },
        updateOneGen: updateOneDto,
      });

      return gen;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Delete(':id')
  @UseGuards(new Scopes(['ADMIN']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async deleteOne(@Param() { id }): Promise<boolean> {
    try {
      const isDeleted = await this.gensService.deleteOne({
        query: { _id: id },
      });

      return isDeleted;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }
}
