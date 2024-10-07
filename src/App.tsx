import { useEffect } from 'react'
import './App.css'
import Home from './Pages/Home'
import Leaderboard from './Pages/LeaderBoard'
import GameScreen from './Pages/sharedComp/GameScreen'
import NavigationBar from './Pages/sharedComp/NavigationBar'
import PlayScreen from './Pages/sharedComp/PlayScreen'
import Wallet from './Pages/Wallet'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
const HomeWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/game-screen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
