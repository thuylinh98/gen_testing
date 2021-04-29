import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  buildFindingQuery,
  buildFindingQueryByObject,
} from 'src/helpers/build';
import { TestResults } from './models/testResult.schema';
import {
  CreateOneService,
  FindManyService,
  FindOneService,
  TestResult,
  FindManyTestResultResponse,
  UpdateTestResultService,
  DeleteOneService,
} from './types/testResult.interface';

@Injectable()
export class TestResultService {
  constructor(
    @InjectModel(TestResults)
    private readonly testResultModel: Model<TestResult>,
  ) {}

  async createOne({
    createOneTestResult,
    user,
  }: CreateOneService): Promise<TestResult> {
    try {
      const createOneTestParams = {
        ...createOneTestResult,
        createdBy: user._id,
      };

      const testResult = await this.testResultModel.create(createOneTestParams);

      return testResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query }: FindOneService): Promise<TestResult> {
    try {
      const testResult = await this.testResultModel
        .findOne(query)
        .populate('createdBy')
        .populate('testingId');

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

  async findMany({
    query,
  }: FindManyService): Promise<FindManyTestResultResponse> {
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
          this.testResultModel
            .find(findingQuery)
            .sort(sortingCondition)
            .limit(Number(limit))
            .populate({ path: 'createdBy' }),
          this.testResultModel.countDocuments(findAllQuery),
        );
      }

      if (!hasPage) {
        promises.push(
          this.testResultModel
            .find(findAllQuery)
            .populate({ path: 'createdBy' }),
          this.testResultModel.countDocuments(findAllQuery),
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
    updateOneTestResult,
  }: UpdateTestResultService): Promise<TestResult> {
    try {
      const testResult = await this.testResultModel.findOne(query);

      if (!testResult) {
        return Promise.reject({
          name: 'TestResultNotFound',
          code: 404,
        });
      }

      const updated = Object.assign(testResult, updateOneTestResult);

      const updatedTestResult = await this.testResultModel.findOneAndUpdate(
        query,
        { $set: updated },
        { upsert: false, new: true },
      );

      return updatedTestResult;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({ query }: DeleteOneService): Promise<boolean> {
    try {
      const testResult = await this.testResultModel.findOne(query);

      if (!testResult) {
        return Promise.reject({
          name: 'TestResultNotFound',
          code: 404,
        });
      }

      await this.testResultModel.findByIdAndDelete(query);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
