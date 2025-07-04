import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletState } from '../../types';

const initialState: WalletState = {
  isConnected: false,
  address: null,
  balance: '0',
  tronWeb: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connectWallet: (state, action: PayloadAction<{ address: string; tronWeb: any }>) => {
      state.isConnected = true;
      state.address = action.payload.address;
      state.tronWeb = action.payload.tronWeb;
    },
    disconnectWallet: (state) => {
      state.isConnected = false;
      state.address = null;
      state.balance = '0';
      state.tronWeb = null;
    },
    updateBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    setTronWeb: (state, action: PayloadAction<any>) => {
      state.tronWeb = action.payload;
    },
  },
});

export const { connectWallet, disconnectWallet, updateBalance, setTronWeb } = walletSlice.actions;
export default walletSlice.reducer; 