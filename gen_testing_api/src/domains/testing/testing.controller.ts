import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Body,
  Get,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Scopes } from 'src/middlewares/authz/authz.service';
import { ValidationPipe } from 'src/middlewares/pipes/validation.pipe';
import { MyLogger } from '../logger/logger.service';
import {
  FindManyQuery,
  FindManyTestingResponse,
  Testing,
} from './types/testing.interface';
import { CreateTestingDto, UpdateTestingDto } from './models/testing.dto';
import { checkControllerErrors } from 'src/helpers/check_errors';
import { TestingService } from './testing.service';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('testings')
@ApiTags('testings')
export class TestingController {
  constructor(
    private readonly testingService: TestingService,
    private readonly userService: UsersService,
  ) {}

  private logger = new MyLogger(TestingController.name);

  @Post()
  @UseGuards(new Scopes([]))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(
    @Request() { user },
    @Body() createOneDto: CreateTestingDto,
  ): Promise<Testing> {
    try {
      // await this.userService.findOne({
      //   query: { _id: createOneDto.patient },
      // });

      const testing = await this.testingService.createOne({
        createOneTesting: createOneDto,
        user,
      });

      return testing;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get(':id')
  @UseGuards(new Scopes([]))
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param() { id }): Promise<Testing> {
    try {
      const testing = await this.testingService.findOne({
        query: { _id: id },
      });

      return testing;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get()
  @UseGuards(new Scopes([]))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findMany(
    @Query() findManyDto: FindManyQuery,
  ): Promise<FindManyTestingResponse> {
    try {
      const testing = await this.testingService.findMany({
        query: { ...findManyDto },
      });

      return testing;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Put(':id')
  @UseGuards(new Scopes([]))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOne(
    @Body() updateOneDto: UpdateTestingDto,
    @Param() { id },
  ): Promise<Testing> {
    try {
      if (updateOneDto.patient) {
        await this.userService.findOne({
          query: { _id: updateOneDto.patient },
        });
      }

      const testing = await this.testingService.updateOne({
        query: { _id: id },
        updateOneTesting: updateOneDto,
      });

      return testing;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }
}
