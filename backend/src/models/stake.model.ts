import mongoose, { Schema, Document } from 'mongoose';

// 质押接口
export interface IStake extends Document {
  userId: mongoose.Types.ObjectId;
  walletAddress: string;
  amount: number;
  transactionId: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  reward: number;
  createdAt: Date;
  updatedAt: Date;
}

// 质押模式定义
const StakeSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    reward: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 创建索引
StakeSchema.index({ userId: 1, createdAt: -1 });
StakeSchema.index({ walletAddress: 1 });
StakeSchema.index({ transactionId: 1 }, { unique: true });

// 创建质押模型
const StakeModel = mongoose.model<IStake>('Stake', StakeSchema);

export default StakeModel; 