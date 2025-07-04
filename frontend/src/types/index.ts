// 用户相关类型
export interface User {
  address: string;
  balance: string;
  energy: string;
  bandwidth: string;
  connectedAt: Date;
}

// 钱包相关类型
export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  tronWeb: any;
}

// 质押相关类型
export interface StakeInfo {
  id: string;
  staker: string;
  amount: string;
  startTime: Date;
  endTime: Date;
  rewards: string;
  status: 'active' | 'ended' | 'withdrawn';
}

// 资源租赁相关类型
export interface ResourceRental {
  id: string;
  provider: string;
  renter: string;
  resourceType: 'energy' | 'bandwidth';
  amount: string;
  duration: number;
  price: string;
  status: 'active' | 'expired' | 'cancelled';
  startTime: Date;
  endTime: Date;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: Date;
} 