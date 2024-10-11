import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { tonConnectConfig } from './config.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TonConnectUIProvider manifestUrl={tonConnectConfig.manifestUrl}>
    <App />
    </TonConnectUIProvider>
  </StrictMode>,

)
