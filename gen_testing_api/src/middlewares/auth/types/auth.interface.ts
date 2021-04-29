import { Types } from 'mongoose';

export interface ReqUser {
  _id: Types.ObjectId;
  username: string;
  email?: string;
  role: string;
  status: string;
}

export interface AccessToken {
  accessToken: string;
}

export interface TokenPayload {
  _id: string;
  username: string;
  email: number;
  role: string;
  status: string;
}
