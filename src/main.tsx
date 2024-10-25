import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Buffer } from 'buffer';
import process from 'process';
import { Provider } from 'react-redux'; // Import Provider
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistor, store } from './slices/store.ts';
// Adjust this import according to your store setup

if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
    window.global = window;
    window.process = process;
}

const manifestURL = "https://russian-roullette-4taj.vercel.app/tonconnect-manifest.json";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap the app with Provider */}
      <PersistGate loading={null} persistor={persistor}> {/* Wrap with PersistGate */}
        <TonConnectUIProvider manifestUrl={manifestURL}>
          <App />
        </TonConnectUIProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
