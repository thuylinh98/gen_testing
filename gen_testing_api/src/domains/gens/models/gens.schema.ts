import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';
import { Users } from 'src/domains/users/models/users.schema';

export const Gens = 'Gens';

export const GenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
  affect: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
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
});

GenSchema.pre('findOneAndUpdate', function () {
  this.update({}, { updatedAt: Date.now() });
});
