import { TestingController } from './testing.controller';
import { TestingService } from './testing.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Testings, TestingSchema } from './models/testing.schema';
import { UsersModule } from '../users/users.module';

const TestingModel = MongooseModule.forFeature([
  { name: Testings, schema: TestingSchema },
]);

@Module({
  imports: [TestingModel, UsersModule],
  controllers: [TestingController],
  providers: [TestingService],
  exports: [TestingModel, TestingService],
})
export class TestingModule {}
