import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import { ApiError } from '../middlewares/error.middleware';

/**
 * 用户控制器
 */
export class UserController {
  /**
   * 处理用户登录/注册
   * 如果用户不存在则创建新用户
   */
  async connectWallet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address } = req.body;
      
      if (!address) {
        throw new ApiError('Wallet address is required', 400);
      }
      
      // 查找用户，如果不存在则创建
      let user = await userService.findByAddress(address);
      
      if (!user) {
        user = await userService.createUser({ address });
      }
      
      // 更新最后登录时间
      await userService.updateLastLogin(user._id);
      
      // 生成JWT令牌
      const token = userService.generateToken(user);
      
      // 返回用户信息和令牌
      res.success({ 
        user: {
          id: user._id,
          address: user.address,
          nickname: user.nickname,
          role: user.role,
          createdAt: user.createdAt
        }, 
        token 
      }, 'Wallet connected successfully');
    } catch (error) {
      next(error instanceof Error ? error : new Error(String(error)));
    }
  }
  
  /**
   * 获取当前用户信息
   */
  async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        throw new ApiError('Unauthorized', 401);
      }
      
      const user = await userService.findById(req.user.id);
      
      res.success({
        id: user._id,
        address: user.address,
        nickname: user.nickname,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }, 'User retrieved successfully');
    } catch (error) {
      next(error instanceof Error ? error : new Error(String(error)));
    }
  }
  
  /**
   * 更新用户资料
   */
  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        throw new ApiError('Unauthorized', 401);
      }
      
      const { nickname, email } = req.body;
      
      const updatedUser = await userService.updateUser(req.user.id, {
        ...(nickname && { nickname }),
        ...(email && { email })
      });
      
      res.success({
        id: updatedUser._id,
        address: updatedUser.address,
        nickname: updatedUser.nickname,
        email: updatedUser.email,
        role: updatedUser.role
      }, 'Profile updated successfully');
    } catch (error) {
      next(error instanceof Error ? error : new Error(String(error)));
    }
  }
}

export default new UserController(); 