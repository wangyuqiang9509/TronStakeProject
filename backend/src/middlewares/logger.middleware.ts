import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { IS_PRODUCTION } from '../config/constants';

/**
 * 开发环境详细日志中间件
 */
export const developmentLogger = morgan('dev');

/**
 * 生产环境精简日志中间件
 */
export const productionLogger = morgan('combined');

/**
 * 请求日志记录器
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  // 当响应完成时记录请求信息
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('user-agent') || 'unknown',
      ip: req.ip || req.socket.remoteAddress || 'unknown',
      timestamp: new Date().toISOString()
    };
    
    console.log(JSON.stringify(log));
  });
  
  next();
};

/**
 * 根据环境选择合适的日志中间件
 */
export const logger = IS_PRODUCTION ? productionLogger : developmentLogger;

export default {
  developmentLogger,
  productionLogger,
  requestLogger,
  logger
}; 