import { GensController } from './gens.controller';
import { GensService } from './gens.service';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Gens, GenSchema } from './models/gens.schema';
import { UsersModule } from '../users/users.module';

const genModel = MongooseModule.forFeature([{ name: Gens, schema: GenSchema }]);

@Module({
  imports: [genModel, forwardRef(() => UsersModule)],
  controllers: [GensController],
  providers: [GensService],
  exports: [GensService, genModel],
})
export class GensModule {}
