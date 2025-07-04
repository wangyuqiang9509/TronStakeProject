import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from './error.middleware';

/**
 * 验证请求中间件
 * 使用express-validator验证请求数据
 * @param validations 验证链数组
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 执行所有验证
    await Promise.all(validations.map(validation => validation.run(req)));

    // 获取验证结果
    const errors = validationResult(req);
    
    // 如果没有错误，继续下一个中间件
    if (errors.isEmpty()) {
      return next();
    }
    
    // 格式化错误
    const formattedErrors: Record<string, string> = {};
    errors.array().forEach(error => {
      if (error.type === 'field') {
        formattedErrors[error.path] = error.msg;
      }
    });
    
    // 抛出验证错误
    next(new ValidationError('Validation failed', formattedErrors));
  };
};

export default validate; 