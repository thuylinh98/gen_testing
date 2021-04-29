import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  UsePipes,
  Get,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FindManyDto, LoginDto, UpdateUserDto } from './models/users.dto';
import { AuthService } from '../../middlewares/auth/auth.service';
import { Scopes } from 'src/middlewares/authz/authz.service';
import { CreateUserDto } from './models/users.dto';
import { UsersService } from './users.service';
import { FindManyUserResponse, User } from './types/users.interface';
import { ValidationPipe } from 'src/middlewares/pipes/validation.pipe';
import { MyLogger } from '../logger/logger.service';
import { checkControllerErrors } from 'src/helpers/check_errors';

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  private logger = new MyLogger(UsersController.name);

  @Post('auth/login')
  @UseGuards(AuthGuard('local'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() { user }, @Body() _: LoginDto) {
    try {
      const accessToken = await this.authService.generateJWT(user);

      return {
        ...accessToken,
        role: user.role,
        userID: user._id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Post('users/create')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createOne(
    @Request() { user },
    @Body() createOneDto: CreateUserDto,
  ): Promise<User> {
    try {
      const newUser = await this.usersService.createOne({
        createOneUser: createOneDto,
        user,
      });

      return newUser;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get('users')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findMany(
    @Query() findManyDto: FindManyDto,
  ): Promise<FindManyUserResponse> {
    try {
      const users = await this.usersService.findMany({
        query: { ...findManyDto },
      });

      return users;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Get('users/:id')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR', 'PATIENT']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async findOne(@Param() { id }): Promise<User> {
    try {
      const user = await this.usersService.findOne({
        query: { _id: id },
      });

      return user;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  @Put('users/:id')
  // @UseGuards(new Scopes(['ADMIN', 'DOCTOR', 'PATIENT']))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async updateOne(
    @Body() updateUserDto: UpdateUserDto,
    @Param() { id },
  ): Promise<User> {
    try {
      const updatedUser = await this.usersService.updateOne({
        query: { _id: id },
        updateOneUser: updateUserDto,
      });

      return updatedUser;
    } catch (error) {
      this.logger.error(`${error.code}:${error.name}:${error.stack}`);
      checkControllerErrors(error);
    }
  }

  // todo
  // @UseGuards(Authz('ADMIN')) check scope
  // finding query
}
