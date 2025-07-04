import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

// 扩展Request接口添加用户信息
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        address: string;
        role?: string;
      };
    }
  }
}

/**
 * 身份验证中间件
 * 验证请求头中的JWT token
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 获取Authorization头
    const authHeader = req.headers.authorization;
    
    // 如果没有提供Authorization头，返回401错误
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ status: 'error', message: 'Access denied. No token provided.' });
      return;
    }
    
    // 提取token
    const token = authHeader.split(' ')[1];
    
    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; address: string; role?: string };
    
    // 将用户信息添加到请求对象
    req.user = {
      id: decoded.id,
      address: decoded.address,
      role: decoded.role
    };
    
    // 继续下一个中间件
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid token.' });
  }
};

/**
 * 管理员角色验证中间件
 * 必须在authenticate中间件之后使用
 */
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ status: 'error', message: 'Access denied. Authentication required.' });
    return;
  }
  
  if (req.user.role !== 'admin') {
    res.status(403).json({ status: 'error', message: 'Access denied. Admin privileges required.' });
    return;
  }
  
  next();
};

export default {
  authenticate,
  authorizeAdmin
}; 