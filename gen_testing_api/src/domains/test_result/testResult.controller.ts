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
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Scopes } from 'src/middlewares/authz/authz.service';
import { ValidationPipe } from 'src/middlewares/pipes/validation.pipe';
import { MyLogger } from '../logger/logger.service';
import { TestResultService } from './testResult.service';
import {
  FindManyTestResultResponse,
  TestResult,
} from './types/testResult.interface';
import {
  CreateTestResultDto,
  FindManyDto,
  UpdateTestResultDto,
} from './models/testResult.dto';
import { checkControllerErrors } from 'src/helpers/check_errors';
import { ApiTags } from '@nestjs/swagger';
import { TestingService } from '../testing/testing.service';

@Controller('test_results')
@ApiTags('test_results')
export class TestResultController {
  constructor(
    private readonly testResultService: TestResultService,
    private readonly testingService: TestingService,
  ) {}

  private logger = new MyLogger(TestResultController.name);

  @Post()
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(
    @Request() { user },
    @Body() createOneDto: CreateTestResultDto,
  ): Promise<TestResult> {
    try {
      await this.testingService.findOne({
        query: { _id: createOneDto.testingId },
      });

      const result = await this.testResultService.createOne({
        createOneTestResult: { ...createOneDto },
        user,
      });

      return result;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get(':id')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param() { id }): Promise<any> {
    try {
      const testResult = await this.testResultService.findOne({
        query: { _id: id },
      });

      const testing = await this.testingService.findOne({
        query: { _id: testResult.testingId },
      });

      const response: any = testResult;
      response.testingId = testing;

      return response;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get('')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findMany(
    @Query() findManyDto: FindManyDto,
  ): Promise<FindManyTestResultResponse> {
    try {
      const testResults = await this.testResultService.findMany({
        query: findManyDto,
      });

      return testResults;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Put(':id')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR', 'PATIENT']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOne(
    @Body() updateTestResultDto: UpdateTestResultDto,
    @Param() { id },
  ): Promise<TestResult> {
    try {
      const updatedTestResult = await this.testResultService.updateOne({
        query: { _id: id },
        updateOneTestResult: updateTestResultDto,
      });

      return updatedTestResult;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Delete(':id')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR', 'PATIENT']))
  @UseGuards(AuthGuard('jwt'))
  async deleteOne(@Param() { id }): Promise<boolean> {
    try {
      const updatedTestResult = await this.testResultService.deleteOne({
        query: { _id: id },
      });

      return updatedTestResult;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }
}
