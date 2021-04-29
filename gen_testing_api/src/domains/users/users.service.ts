import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '../../configs/configs.service';
import {
  User,
  GetCurrentUserCredentials,
  CreateOneService,
  FindManyService,
  FindManyUserResponse,
  FindOneService,
  UpdateUserService,
} from './types/users.interface';
import * as bcrypt from 'bcrypt';
import {
  buildFindingQuery,
  buildFindingQueryByObject,
  buildRegexQuery,
} from 'src/helpers/build';
import { Users } from './models/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async getCurrentUserCredentials(
    query: GetCurrentUserCredentials,
  ): Promise<User> {
    try {
      const user: any = await this.usersModel.findOne(query);

      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOne({ createOneUser, user }: CreateOneService): Promise<User> {
    try {
      const password = await bcrypt.hash(
        createOneUser.password,
        this.configService.bcryptSalt,
      );

      const userParam = {
        ...createOneUser,
        createdBy: user,
        password,
      };

      const createUserData = await this.usersModel.create(userParam);

      delete createOneUser.password;

      return createUserData;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query }: FindOneService): Promise<any> {
    try {
      const user = await this.usersModel.findOne(query);

      if (!user) {
        return Promise.reject({
          name: 'UserNotFound',
          code: 404,
        });
      }

      delete user.password;

      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({ query }: FindManyService): Promise<FindManyUserResponse> {
    try {
      let newQuery: any = { ...query };
      const { limit } = query;
      const promises = [];

      newQuery = buildFindingQueryByObject({
        query: newQuery,
        objectKeys: {
          ids: '_id',
        },
      });

      newQuery = buildRegexQuery({
        query: newQuery,
        regexFields: ['fullname', 'username'],
      });

      const {
        sortingCondition,
        findingQuery,
        findAllQuery,
        hasPage,
      } = buildFindingQuery({ query: newQuery });

      if (hasPage) {
        promises.push(
          this.usersModel
            .find(findingQuery)
            .sort(sortingCondition)
            .limit(Number(limit))
            .populate({ path: 'createdBy' }),
          this.usersModel.countDocuments(findAllQuery),
        );
      }

      if (!hasPage) {
        promises.push(
          this.usersModel.find(findAllQuery).populate({ path: 'createdBy' }),
          this.usersModel.countDocuments(findAllQuery),
        );
      }

      const [users, total] = await Promise.all(promises);

      if (!users || !users.length) {
        return {
          total: 0,
          list: [],
          cursor: null,
        };
      }

      return {
        total,
        list: users,
        cursor: null,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ query, updateOneUser }: UpdateUserService): Promise<User> {
    try {
      const user = await this.usersModel.findOne(query);

      if (!user) {
        return Promise.reject({
          name: 'UserNotFound',
          code: 404,
        });
      }

      let password = user.password;

      if (updateOneUser?.password) {
        password = await bcrypt.hash(
          updateOneUser.password,
          this.configService.bcryptSalt,
        );
      }

      updateOneUser.password = password;

      const updated = Object.assign(user, updateOneUser);

      const updatedUser = await this.usersModel.findOneAndUpdate(
        query,
        { $set: updated },
        { upsert: false, new: true },
      );

      return updatedUser;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
