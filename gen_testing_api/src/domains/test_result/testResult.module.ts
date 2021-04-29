import { TestResultController } from './testResult.controller';
import { TestResultService } from './testResult.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestResults, TestResultSchema } from './models/testResult.schema';
import { TestingModule } from '../testing/testing.module';

const TestResultModel = MongooseModule.forFeature([
  { name: TestResults, schema: TestResultSchema },
]);

@Module({
  imports: [TestResultModel, TestingModule],
  controllers: [TestResultController],
  providers: [TestResultService],
  exports: [TestResultModel, TestResultService],
})
export class TestResultModule {}
