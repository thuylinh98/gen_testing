import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  buildFindingQuery,
  buildFindingQueryByObject,
} from 'src/helpers/build';
import { TestingResults } from './models/testingResult.schema';
import {
  CreateOneService,
  FindManyService,
  FindOneService,
  TestingResult,
  FindManyTestingResultResponse,
  UpdateTestingResultService,
  DeleteOneService,
} from './types/testingResult.interface';

@Injectable()
export class TestingResultService {
  constructor(
    @InjectModel(TestingResults)
    private readonly testingResultModel: Model<TestingResult>,
  ) {}

  async createOne({
    createOneTestingResult,
    user,
  }: CreateOneService): Promise<TestingResult> {
    try {
      const createOneTestingParams = {
        ...createOneTestingResult,
        createdBy: user._id,
      };

      const testResult = await this.testingResultModel.create(
        createOneTestingParams,
      );

      return testResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query }: FindOneService): Promise<TestingResult> {
    try {
      const testResult = await this.testingResultModel
        .findOne(query)
        .populate('createdBy')
        .populate('patient')
        .populate('testingId');

      if (!testResult) {
        return Promise.reject({
          name: 'TestingResultNotFound',
          code: 404,
        });
      }

      return testResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({
    query,
  }: FindManyService): Promise<FindManyTestingResultResponse> {
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

      const {
        sortingCondition,
        findingQuery,
        findAllQuery,
        hasPage,
      } = buildFindingQuery({ query: newQuery });

      if (hasPage) {
        promises.push(
          this.testingResultModel
            .find(findingQuery)
            .sort(sortingCondition)
            .limit(Number(limit))
            .populate({ path: 'createdBy' })
            .populate({ path: 'patient' })
            .populate({ path: 'testingId' }),
          this.testingResultModel.countDocuments(findAllQuery),
        );
      }

      if (!hasPage) {
        promises.push(
          this.testingResultModel
            .find(findAllQuery)
            .populate({ path: 'createdBy' })
            .populate({ path: 'testingId' })
            .populate({ path: 'patient' }),
          this.testingResultModel.countDocuments(findAllQuery),
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
    updateOneTestingResult,
  }: UpdateTestingResultService): Promise<TestingResult> {
    try {
      const testingResult = await this.testingResultModel.findOne(query);

      if (!testingResult) {
        return Promise.reject({
          name: 'TestResultNotFound',
          code: 404,
        });
      }

      let result = testingResult.testResult || [];

      if (!result || !result.length) {
        result.push(updateOneTestingResult.testResult[0]);
      }

      let isExisted = false;

      result = result.map((item) => {
        if (item.name == updateOneTestingResult.testResult[0].name) {
          isExisted = true;
          return updateOneTestingResult.testResult[0];
        }

        return item;
      });

      if (!isExisted) {
        result.push(updateOneTestingResult.testResult[0]);
      }

      testingResult.testResult = result;

      const updatedTestResult = await this.testingResultModel.findOneAndUpdate(
        query,
        { $set: testingResult },
        { upsert: false, new: true },
      );

      return updatedTestResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({ query }: DeleteOneService): Promise<boolean> {
    try {
      const testResult = await this.testingResultModel.findOne(query);

      if (!testResult) {
        return Promise.reject({
          name: 'TestResultNotFound',
          code: 404,
        });
      }

      await this.testingResultModel.findByIdAndDelete(query);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
