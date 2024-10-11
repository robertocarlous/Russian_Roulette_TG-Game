// src/config/ton-connect.ts
export const tonConnectConfig = {
    manifestUrl: import.meta.env.Connection === 'development' 
      ? 'http://localhost:3000/tonconnect-manifest.json'
      : 'https://russian-roullette-4taj.vercel.app/tonconnect-manifest.json',
      manifestDirectory: 'public' 
  };
  

  export const verifyTonConnectConfig = () => {
    console.log('Current environment:', import.meta.env.VITE_APP_ENV);
    console.log('Manifest URL:', tonConnectConfig.manifestUrl);
    return tonConnectConfig;
  };