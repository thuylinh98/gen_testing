import { Document, Types } from 'mongoose';

export interface User extends Document {
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePhoto: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCurrentUserCredentials {
  email?: string;
  username?: string;
  _id?: Types.ObjectId;
}

export interface CreateOneUser {
  username: string;
  fullname?: string;
  email: string;
  phoneNumber?: string;
  password: string;
  profilePhoto?: string;
  status?: string;
  role?: string;
}

export interface CreateOneService {
  createOneUser: CreateOneUser;
  user: User;
}

export interface FindManyQuery {
  sortBy?: string;
  sortDirection?: string;
  limit?: string;
  role?: string;
  fullname?: string;
  cursor?: string;
  createdBy?: Types.ObjectId;
}

export interface FindManyService {
  query: FindManyQuery;
}

export interface FindManyUserResponse {
  total: number;
  list: User[];
  cursor: string;
}

export interface FindOneService {
  query: any;
}

export interface UpdateUserService {
  query: any;
  updateOneUser: UpdateOneUser;
}

export interface UpdateOneUser {
  username?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  profilePhoto?: string;
  status?: string;
  role?: string;
}
