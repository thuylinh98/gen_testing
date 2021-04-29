import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './models/users.schema';
import { AuthModule } from '../../middlewares/auth/auth.module';

const UsersModel = MongooseModule.forFeature([
  { name: 'Users', schema: UsersSchema },
]);

@Module({
  imports: [UsersModel, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModel],
})
export class UsersModule {}
