import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// 导入配置和中间件
import { connectDB, connectRedis } from './config/database';
import { API_PREFIX } from './config/constants';
import { logger, requestLogger } from './middlewares/logger.middleware';
import { responseFormatter } from './middlewares/response.middleware';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware';

// 导入API路由
import apiRoutes from './routes';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();
const port = process.env.PORT || 3001;

// 连接数据库
connectDB().catch(err => {
  console.error(`Failed to connect to MongoDB: ${err.message}`);
});

// 连接Redis
connectRedis().catch(err => {
  console.error(`Failed to connect to Redis: ${err.message}`);
});

// 基本中间件
app.use(cors());
app.use(helmet());
app.use(logger);
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseFormatter);

// 健康检查路由
app.get('/health', (req, res) => {
  res.success({ uptime: process.uptime() }, 'Server is running');
});

// 挂载API路由
app.use(API_PREFIX, apiRoutes);

// 404处理
app.use(notFoundHandler);

// 错误处理中间件
app.use(errorHandler);

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API base URL: ${API_PREFIX}`);
});

export default app; 