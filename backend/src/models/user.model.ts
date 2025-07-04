import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// 用户接口
export interface IUser extends Document {
  address: string;  // TRON钱包地址
  nickname?: string;
  email?: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

// 用户模式定义
const UserSchema: Schema = new Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    nickname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// 创建索引
UserSchema.index({ address: 1 }, { unique: true });

// 比较密码方法 (针对未来可能的密码保护功能)
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  try {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

// 创建用户模型
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel; 