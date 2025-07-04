import UserModel, { IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants';
import { NotFoundError, ApiError } from '../middlewares/error.middleware';

/**
 * 用户服务类
 */
export class UserService {
  /**
   * 创建新用户
   */
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      const user = new UserModel(userData);
      return await user.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ApiError('User with this address already exists', 409);
      }
      throw error;
    }
  }

  /**
   * 根据钱包地址查找用户
   */
  async findByAddress(address: string): Promise<IUser | null> {
    return await UserModel.findOne({ address: address.toLowerCase() });
  }

  /**
   * 根据ID查找用户
   */
  async findById(id: string): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  /**
   * 更新用户信息
   */
  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser> {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  }

  /**
   * 更新最后登录时间
   */
  async updateLastLogin(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, {
      $set: { lastLoginAt: new Date() }
    });
  }

  /**
   * 生成JWT令牌
   */
  generateToken(user: IUser): string {
    return jwt.sign(
      {
        id: user._id,
        address: user.address,
        role: user.role
      },
      JWT_SECRET as jwt.Secret,
      {
        expiresIn: JWT_EXPIRES_IN
      }
    );
  }
}

export default new UserService(); 