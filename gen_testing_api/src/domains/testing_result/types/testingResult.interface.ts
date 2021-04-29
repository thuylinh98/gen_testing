import { ObjectId } from 'bson';
import { Types, Document } from 'mongoose';
import { User } from '../../users/types/users.interface';

interface Result {
  result?: string;
  content?: string;
}

interface Recommend {
  recommend?: string;
  content?: string;
}

interface Gen {
  name?: string;
  type?: string;
  property?: string;
  affect?: string;
  content?: string;
}
interface TestResult {
  name: string;
  description: string;
  results?: Result[];
  recommends?: Recommend[];
  gens?: Gen[];
}

export interface TestingResult extends Document {
  testResult: TestResult[];
  createdAt: string;
  updatedAt: string;
  createdBy: Types.ObjectId;
  testingId: Types.ObjectId;
  patient: Types.ObjectId;
}

export interface CreateOneTestingResult {
  testResult: TestResult[];
  testingId: string;
  patient: string;
}

export interface CreateOneService {
  createOneTestingResult: CreateOneTestingResult;
  user: User;
}

export interface FindOneService {
  query: any;
}

export interface FindManyQuery {
  sortBy?: string;
  createdAt?: string;
  sortDirection?: string;
  limit?: string;
  cursor?: string;
}

export interface FindManyService {
  query: FindManyQuery;
}

export interface FindManyTestingResultResponse {
  total: number;
  list: TestResult[];
  cursor: string;
}

export interface UpdateTestingResultService {
  query: any;
  updateOneTestingResult: UpdateOneTestingResult;
}

export interface UpdateOneTestingResult {
  testResult: TestResult[];
}

export interface DeleteOneService {
  query: {
    _id: ObjectId;
  };
}
