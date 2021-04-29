import { Types, Document } from 'mongoose';
import { User } from '../../users/types/users.interface';

export interface SubTesting {
  name: string;
  description: string;
  numberGen: number;
  gen: string[];
}

export interface Testing extends Document {
  name: string;
  results: SubTesting[];
  patient?: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOneTesting {
  name: string;
  patient?: string;
}

export interface CreateOneService {
  createOneTesting: CreateOneTesting;
  user: User;
}

export interface FindOneService {
  query: any;
}

export interface FindManyQuery {
  name?: string;
  patient?: string;
  createdBy?: string;
  sortBy?: string;
  createdAt?: string;
  sortDirection?: string;
  limit?: string;
  cursor?: string;
}

export interface FindManyService {
  query: FindManyQuery;
}

export interface FindManyTestingResponse {
  list: Testing[];
  total: number;
  cursor: string;
}

export interface UpdateOneTestingService {
  query: any;
  updateOneTesting: UpdateOneTesting;
}

export interface UpdateOneTesting {
  name?: string;
  patient?: string;
}
