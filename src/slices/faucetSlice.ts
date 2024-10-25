import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpinHistoryEntry {
  timestamp: string;
  cost: number;
}

// Update the state interface to include claimedHistory with addresses
interface FaucetState {
  balance: string;
  claimedHistory: { address: string; timestamp: string }[]; // Store both address and timestamp
  spinHistory: SpinHistoryEntry[];
}

const initialState: FaucetState = {
  balance: '1000',
  claimedHistory: [],
  spinHistory: [],
};

const faucetSlice = createSlice({
  name: 'faucet',
  initialState,
  reducers: {
    claimTokens: (state, action: PayloadAction<string>) => { // Accept an address
      const address = action.payload;
      
      // Check if the user has already claimed
      const hasClaimed = state.claimedHistory.some(entry => entry.address === address);
      
      if (!hasClaimed) {
        state.balance = (Number(state.balance) + 100).toString();
        state.claimedHistory.push({ address, timestamp: new Date().toISOString() }); // Store address and timestamp
      }
    },
    deductSpinCost: (state) => {
      state.balance = (Number(state.balance) - 5).toString();
      state.spinHistory.push({
        timestamp: new Date().toISOString(),
        cost: 5,
      });
    },
    resetFaucet: () => initialState,
  },
});

// Export actions and reducer
export const { claimTokens, deductSpinCost, resetFaucet } = faucetSlice.actions;
export default faucetSlice.reducer;
