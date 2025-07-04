import mongoose, { Schema, Document } from 'mongoose';

// 资源租赁接口
export interface IResourceRental extends Document {
  lessorId: mongoose.Types.ObjectId;
  lessorAddress: string;
  tenantId?: mongoose.Types.ObjectId;
  tenantAddress?: string;
  resourceType: string;
  amount: number;
  pricePerDay: number;
  duration: number;
  startDate?: Date;
  endDate?: Date;
  status: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 资源租赁模式定义
const ResourceRentalSchema: Schema = new Schema(
  {
    lessorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lessorAddress: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tenantAddress: {
      type: String,
      trim: true,
      lowercase: true,
    },
    resourceType: {
      type: String,
      enum: ['bandwidth', 'energy'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'completed', 'cancelled'],
      default: 'available',
    },
    transactionId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// 创建索引
ResourceRentalSchema.index({ lessorId: 1, status: 1 });
ResourceRentalSchema.index({ tenantId: 1, status: 1 });
ResourceRentalSchema.index({ resourceType: 1, status: 1 });
ResourceRentalSchema.index({ createdAt: -1 });

// 创建资源租赁模型
const ResourceRentalModel = mongoose.model<IResourceRental>('ResourceRental', ResourceRentalSchema);

export default ResourceRentalModel; 