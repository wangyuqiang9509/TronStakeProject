import { Request, Response, NextFunction } from 'express';

/**
 * 扩展Response接口添加标准响应方法
 */
declare global {
  namespace Express {
    interface Response {
      success: (data?: any, message?: string, statusCode?: number) => Response;
      error: (message?: string, statusCode?: number, errors?: Record<string, string>) => Response;
    }
  }
}

/**
 * 响应格式化中间件
 * 添加标准化的成功和错误响应方法
 */
export const responseFormatter = (req: Request, res: Response, next: NextFunction): void => {
  /**
   * 成功响应方法
   */
  res.success = (data = {}, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  };

  /**
   * 错误响应方法
   */
  res.error = (message = 'Error occurred', statusCode = 500, errors = {}) => {
    return res.status(statusCode).json({
      status: 'error',
      message,
      ...(Object.keys(errors).length > 0 ? { errors } : {}),
    });
  };

  next();
};

export default responseFormatter; 