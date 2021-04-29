import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  buildFindingQuery,
  buildFindingQueryByObject,
  buildRegexQuery,
} from 'src/helpers/build';
import { Gens } from './models/gens.schema';
import {
  CreateOneService,
  DeleteOneService,
  FindManyResponse,
  FindManyService,
  FindOneService,
  Gen,
  UpdateOneService,
} from './types/gens.interface';

@Injectable()
export class GensService {
  constructor(
    @InjectModel(Gens)
    private readonly genModel: Model<Gen>,
  ) {}

  async createOne({ createOneGen, user }: CreateOneService): Promise<Gen> {
    try {
      const createOneParam = {
        ...createOneGen,
        createdBy: user,
      };

      const gen = await this.genModel.create(createOneParam);

      return gen;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query }: FindOneService): Promise<Gen> {
    try {
      const gen = await this.genModel.findOne(query).populate('createdBy');

      if (!gen) {
        return Promise.reject({
          name: 'Gen not found',
          code: 404,
        });
      }

      return gen;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany({ query }: FindManyService): Promise<FindManyResponse> {
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
        regexFields: ['name', 'type', 'property'],
      });

      const {
        sortingCondition,
        findingQuery,
        findAllQuery,
        hasPage,
      } = buildFindingQuery({ query: newQuery });

      if (hasPage) {
        promises.push(
          this.genModel
            .find(findingQuery)
            .sort(sortingCondition)
            .limit(Number(limit))
            .populate({ path: 'createdBy' }),
          this.genModel.countDocuments(findAllQuery),
        );
      }

      if (!hasPage) {
        promises.push(
          this.genModel.find(findAllQuery).populate({ path: 'createdBy' }),
          this.genModel.countDocuments(findAllQuery),
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

  async updateOne({ query, updateOneGen }: UpdateOneService): Promise<Gen> {
    try {
      const gen = await this.genModel.findOne(query).populate('createdBy');

      if (!gen) {
        return Promise.reject({
          name: 'Gen not found',
          code: 404,
        });
      }

      const updateGen = Object.assign(gen, updateOneGen);

      const response = await this.genModel.findOneAndUpdate(
        query,
        { $set: updateGen },
        { upsert: false, new: true },
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({ query }: DeleteOneService): Promise<boolean> {
    try {
      const gen = await this.genModel.findOne(query);

      if (!gen) {
        return Promise.reject({
          name: 'Gen not found',
          code: 404,
        });
      }

      await this.genModel.findByIdAndDelete(query);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
