import { useEffect, useState } from 'react'

import './App.css'
import Home from './Pages/Home'
import Leaderboard from './Pages/LeaderBoard'
import GameScreen from './Pages/sharedComp/GameScreen'
import NavigationBar from './Pages/sharedComp/NavigationBar'
import PlayScreen from './Pages/sharedComp/PlayScreen'
import Wallet from './Pages/Wallet'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';






const SESSION_KEY = 'app_session';

const HomeWrapper = () => {
  const [isNewSession, setIsNewSession] = useState(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    return !session;
  });

  useEffect(() => {
    if (isNewSession) {
      // Set session flag
      sessionStorage.setItem(SESSION_KEY, 'true');
      
      const timer = setTimeout(() => {
        setIsNewSession(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isNewSession]);

  // For existing sessions, show GameScreen
  if (!isNewSession) {
    return <GameScreen />;
  }

  // For new sessions, show home
  return <Home />;
};
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
