import { ObjectId } from 'bson';
import { Document, Types } from 'mongoose';
import { User } from 'src/domains/users/types/users.interface';

export interface Gen extends Document {
  name: string;
  type: string;
  property: string;
  affect: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: Types.ObjectId;
}

export interface CreateOneGen {
  name: string;
  type: string;
  property: string;
  affect: string;
  content: string;
}

export interface CreateOneService {
  createOneGen: CreateOneGen;
  user: User;
}

export interface FindOneService {
  query: any;
}

export interface FindManyQuery {
  name?: string;
  type?: string;
  property?: string;
  sortBy?: string;
  createdAt?: string;
  sortDirection?: string;
  limit?: string;
  cursor?: string;
}

export interface FindManyService {
  query: FindManyQuery;
}

export interface FindManyResponse {
  total: number;
  list: Gen[];
  cursor: string;
}

export interface UpdateOneGen {
  name?: string;
  type?: string;
  property?: string;
  affect?: string;
  content?: string;
}

export interface UpdateOneService {
  updateOneGen: UpdateOneGen;
  query: {
    _id: ObjectId;
  };
}

export interface DeleteOneService {
  query: {
    _id: ObjectId;
  };
}
