// 环境配置
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_TEST = NODE_ENV === 'test';

// 服务器配置
export const PORT = process.env.PORT || 3001;
export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

// JWT配置
export const JWT_SECRET = process.env.JWT_SECRET || 'tron-stake-secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// TRON网络配置
export const TRON_NETWORK = process.env.TRON_NETWORK || 'shasta';
export const TRON_API_KEY = process.env.TRON_API_KEY;
export const TRON_NETWORKS = {
  mainnet: 'https://api.trongrid.io',
  shasta: 'https://api.shasta.trongrid.io',
  nile: 'https://api.nileex.io',
};

// 合约地址
export const STAKING_CONTRACT_ADDRESS = process.env.STAKING_CONTRACT_ADDRESS;
export const RESOURCE_RENTAL_CONTRACT_ADDRESS = process.env.RESOURCE_RENTAL_CONTRACT_ADDRESS;
export const REWARD_DISTRIBUTION_CONTRACT_ADDRESS = process.env.REWARD_DISTRIBUTION_CONTRACT_ADDRESS;

// 缓存配置
export const CACHE_TTL = 60 * 5; // 5分钟默认缓存时间

// 分页默认值
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

// 数据库配置
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tronstakedb_dev';
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

export default {
  NODE_ENV,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  IS_TEST,
  PORT,
  API_VERSION,
  API_PREFIX,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  TRON_NETWORK,
  TRON_API_KEY,
  TRON_NETWORKS,
  STAKING_CONTRACT_ADDRESS,
  RESOURCE_RENTAL_CONTRACT_ADDRESS,
  REWARD_DISTRIBUTION_CONTRACT_ADDRESS,
  CACHE_TTL,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MONGO_URI,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
}; 