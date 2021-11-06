import mongoose from 'mongoose';

import { PasswordHash, toHash } from '../api/password';


interface UserAttrs {
  email: string;
  hash: PasswordHash;
}

interface UserModel extends mongoose.Model<UserDoc> {
  mk(attrs: UserAttrs): any;
}

interface UserDoc extends mongoose.Document {
  email: string;
  hash: PasswordHash;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  hash: {
    key: {
      type: String,
      required: true
    },
    settings: {
      salt: {
        type: String,
        required: true
      },
      iterations: {
        type: Number,
        required: true
      },
      keylen: {
        type: Number,
        required: true
      },
      digest: {
        type: String,
        required: true
      },
    },
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.hash;
      return ret;
    }
  },
});

userSchema.pre('save', async function(done) {
  done();
});

userSchema.statics.mk = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

