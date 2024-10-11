import { useEffect } from 'react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
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
function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://russian-roullette-4taj.vercel.app/tonconnect-manifest.json">
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
    </TonConnectUIProvider>
  )
}

export default App
