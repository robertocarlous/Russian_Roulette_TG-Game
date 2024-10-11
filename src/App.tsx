import { useEffect } from 'react'

import './App.css'
import Home from './Pages/Home'
import Leaderboard from './Pages/LeaderBoard'
import GameScreen from './Pages/sharedComp/GameScreen'
import NavigationBar from './Pages/sharedComp/NavigationBar'
import PlayScreen from './Pages/sharedComp/PlayScreen'
import Wallet from './Pages/Wallet'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { initializeWebApp } from './Authenticator'
const HomeWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = initializeWebApp();
if (!userData) {
  console.error('Failed to initialize Telegram WebApp');
}
    const timer = setTimeout(() => {
      navigate('/game-screen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <Home />;
};

// const manifestConfiguration = {
//   manifestUrl: '/tonconnect-manifest.json', // Note: Use relative path
//   connectButtonOptions: { // Optional: Customize the connect button
//     style: {
//       borderRadius: '10px',
//     },
//   },
//   walletsListConfiguration: { // Optional: Configure wallets list
//     includeWallets: [
//       { name: 'Tonkeeper', id: 'tonkeeper' } as unknown as UIWallet,
//       { name: 'OpenMask', id: 'openmask' } as unknown as UIWallet,
//       { name: 'MyTonWallet', id: 'mytonwallet' } as unknown as UIWallet,
//     ],
//   },
// };
function App() {
  return (
   <>
    <Router>
      <div>
        <Routes>
          <Route  path="/" element={<HomeWrapper />} />
          <Route  path="/leaderboard" element={<Leaderboard />} />
          <Route  path="/wallet" element={<Wallet />} />
          <Route  path="/game-screen" element={<GameScreen />} />
          <Route  path="/play-screen" element={<PlayScreen />} />
        </Routes>
        <NavigationBar/>
      </div>
    </Router>
   </>
  )
}

export default App
