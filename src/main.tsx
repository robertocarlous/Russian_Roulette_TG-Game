import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
// import { tonConnectConfig } from './config.ts'
const manifestURL = "https://russian-roullette-4taj.vercel.app/tonconnect-manifest.json"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TonConnectUIProvider manifestUrl={manifestURL}>
    <App />
    </TonConnectUIProvider>
  </StrictMode>,

)
