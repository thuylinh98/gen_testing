import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  buildFindingQuery,
  buildFindingQueryByObject,
  buildRegexQuery,
} from 'src/helpers/build';
import { Testings } from './models/testing.schema';
import {
  CreateOneService,
  FindManyService,
  FindManyTestingResponse,
  FindOneService,
  Testing,
  UpdateOneTestingService,
} from './types/testing.interface';

@Injectable()
export class TestingService {
  constructor(
    @InjectModel(Testings)
    private readonly testingModel: Model<Testing>,
  ) {}

  async createOne({
    createOneTesting,
    user,
  }: CreateOneService): Promise<Testing> {
    try {
      const createOneTestingParams = {
        ...createOneTesting,
        createdBy: user._id,
      };

      const testing = await this.testingModel.create(createOneTestingParams);

      return testing;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query }: FindOneService): Promise<Testing> {
    try {
      const testResult = await this.testingModel
        .findOne(query)
        .populate('createdBy')
        .populate('patient');

      if (!testResult) {
        return Promise.reject({
          name: 'TestResultNotFound',
          code: 404,
        });
      }

      return testResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({ query }: FindManyService): Promise<FindManyTestingResponse> {
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
        regexFields: ['name'],
      });

      const {
        sortingCondition,
        findingQuery,
        findAllQuery,
        hasPage,
      } = buildFindingQuery({ query: newQuery });

      if (hasPage) {
        promises.push(
          this.testingModel
            .find(findingQuery)
            .sort(sortingCondition)
            .limit(Number(limit))
            .populate({ path: 'createdBy' })
            .populate({ path: 'patient' }),
          this.testingModel.countDocuments(findAllQuery),
        );
      }

      if (!hasPage) {
        promises.push(
          this.testingModel
            .find(findAllQuery)
            .populate({ path: 'createdBy' })
            .populate({ path: 'patient' }),
          this.testingModel.countDocuments(findAllQuery),
        );
      }

      const [testResult, total] = await Promise.all(promises);

      if (!testResult || !testResult.length) {
        return {
          total: 0,
          list: [],
          cursor: null,
        };
      }

      return {
        total,
        list: testResult,
        cursor: null,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({
    query,
    updateOneTesting,
  }: UpdateOneTestingService): Promise<Testing> {
    try {
      const testing = await this.testingModel.findOne(query);

      if (!testing) {
        return Promise.reject({
          name: 'TestingNotFound',
          code: 404,
        });
      }

      const updated = Object.assign(testing, updateOneTesting);

      const updatedTesting = await this.testingModel.findOneAndUpdate(
        query,
        { $set: updated },
        { upsert: false, new: true },
      );

      return updatedTesting;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
