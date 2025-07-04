import mongoose from 'mongoose';
import { createClient, RedisClientType } from 'redis';
import { MONGO_URI, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from './constants';

/**
 * 连接到MongoDB数据库
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully.');
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected.');
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    // 在实际应用中，你可能希望在这里进行更复杂的错误处理
    // 例如，尝试重新连接几次，或者优雅地关闭服务器
    process.exit(1);
  }
};

/**
 * 创建并配置Redis客户端
 */
export const redisClient: RedisClientType = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  password: REDIS_PASSWORD,
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected successfully.');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection failed:', err);
});

redisClient.on('reconnecting', () => {
  console.log('Redis is reconnecting...');
});

/**
 * 连接到Redis
 * 只有在客户端未连接时才执行连接操作
 */
export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
    } catch(err) {
      console.error('Could not connect to Redis:', err);
    }
  }
};

export default {
  connectDB,
  redisClient,
  connectRedis,
}; 