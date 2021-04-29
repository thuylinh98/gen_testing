import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { Testings } from 'src/domains/testing/models/testing.schema';
import { Users } from 'src/domains/users/models/users.schema';

export const TestResults = 'TestResults';

export const TestResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  results: [
    {
      result: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  recommends: [
    {
      recommend: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  gens: [
    {
      name: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
      property: {
        type: String,
        required: false,
      },
      affect: {
        type: String,
        required: false,
      },
      content: {
        type: String,
        required: false,
      },
    },
  ],
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
  testingId: {
    type: ObjectId,
    ref: Testings,
    required: true,
  },
});

TestResultSchema.pre('findOneAndUpdate', function () {
  this.update({}, { updatedAt: Date.now() });
});
