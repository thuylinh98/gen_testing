import { GensModule } from './domains/gens/gens.module';
import { TestResultModule } from './domains/test_result/testResult.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/configs.module';
import { UsersModule } from './domains/users/users.module';
import { ConfigService } from './configs/configs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './domains/logger/logger.module';
import { TestingModule } from './domains/testing/testing.module';
import { MailerModule } from './domains/mailer/mailer.module';
import { TestingResultModule } from './domains/testing_result/testingResult.module';

const DatabaseModule = MongooseModule.forRootAsync({
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.database.uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
  },
  inject: [ConfigService],
});

@Module({
  imports: [
    GensModule,
    TestResultModule,
    ConfigModule,
    DatabaseModule,
    UsersModule,
    LoggerModule,
    TestingModule,
    MailerModule,
    TestingResultModule,
  ],
})
export class AppModule {}
