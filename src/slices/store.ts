// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import faucetReducer from "./faucetSlice" // Import the faucet reducer

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['faucet'], // Ensure you only persist the faucet slice
};

const persistedReducer = persistReducer(persistConfig, faucetReducer);

export const store = configureStore({
  reducer: {
    faucet: persistedReducer, // Use the persisted reducer for the faucet slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
