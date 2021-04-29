import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';

export const Users = 'Users';

export const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    status: { type: String, enum: ['INACTIVE', 'ACTIVE'], default: 'INACTIVE' },
    profilePhoto: String,
    role: {
      type: String,
      enum: ['DOCTOR', 'PATIENT', 'ADMIN'],
      default: 'PATIENT',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: ObjectId,
      ref: Users,
      required: true,
    },
  },
  {
    collation: { locale: 'en', strength: 2 },
  },
);

UsersSchema.pre('findOneAndUpdate', function () {
  this.update({}, { updatedAt: Date.now() });
});

UsersSchema.pre('updateMany', function () {
  this.update({}, { updatedAt: Date.now() });
});
