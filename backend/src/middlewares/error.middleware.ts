import { Request, Response, NextFunction } from 'express';
import { IS_PRODUCTION } from '../config/constants';

/**
 * 自定义API错误类
 */
export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 未找到资源错误
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * 验证错误
 */
export class ValidationError extends ApiError {
  errors: Record<string, string>;
  
  constructor(message = 'Validation error', errors: Record<string, string> = {}) {
    super(message, 400);
    this.errors = errors;
  }
}

/**
 * 授权错误
 */
export class AuthorizationError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * 404错误处理中间件
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  next(new NotFoundError(`Route not found: ${req.originalUrl}`));
};

/**
 * 全局错误处理中间件
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  
  // 默认错误状态码和消息
  let statusCode = 500;
  let message = 'Internal server error';
  let errors = {};
  
  // 处理不同类型的错误
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    
    if (err instanceof ValidationError) {
      errors = err.errors;
    }
  }
  
  // 在生产环境中隐藏500错误的具体信息
  if (statusCode === 500 && IS_PRODUCTION) {
    message = 'Internal server error';
  }
  
  // 发送错误响应
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(Object.keys(errors).length > 0 ? { errors } : {}),
    ...(IS_PRODUCTION ? {} : { stack: err.stack })
  });
};

export default {
  ApiError,
  NotFoundError,
  ValidationError,
  AuthorizationError,
  notFoundHandler,
  errorHandler
}; 