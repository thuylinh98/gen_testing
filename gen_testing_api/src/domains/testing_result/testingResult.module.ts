import { TestingResultController } from './testingResult.controller';
import { TestingResultService } from './testingResult.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TestingResults,
  TestingResultSchema,
} from './models/testingResult.schema';
import { TestingModule } from '../testing/testing.module';

const TestingResultModel = MongooseModule.forFeature([
  { name: TestingResults, schema: TestingResultSchema },
]);

@Module({
  imports: [TestingResultModel, TestingModule],
  controllers: [TestingResultController],
  providers: [TestingResultService],
  exports: [TestingResultModel, TestingResultService],
})
export class TestingResultModule {}
