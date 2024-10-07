
import { Home,   Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GiPistolGun } from "react-icons/gi";
import { IoPodium } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useState } from 'react';
const NavigationBar = () => {
  const [active,setActive] = useState("Home")
  
  const handleClick = (tab:string) => {
    setActive(tab);
  }
  return (
    <nav className=" bg-[#191F57] w-[20rem]  p-2 flex justify-around items-center">
        <Link to="/">
      <Button variant="ghost" size="icon" className="text-white hover:text-blue-200" onClick={()=>handleClick("Home")}>
        <Home className="h-6 w-6"  />
      </Button>
      </Link>
      <Link to="/play-screen">
      <Button variant="ghost" size="icon" className="text-white hover:text-blue-200" onClick={()=>handleClick("Gun")}>
        <GiPistolGun className="h-6 w-6" />
      </Button>
      </Link>
      <Link to="/leaderboard">
      <Button variant="ghost" size="icon" className="text-white hover:text-blue-200" onClick={()=>handleClick("podium")}>
        <IoPodium className="h-6 w-6" />
      </Button>
      </Link>
     <Link to="/wallet">
     <Button variant="ghost" size="icon" className="text-white hover:text-blue-200" onClick={()=>handleClick("Wallet")}>
        <Wallet className="h-6 w-6" />
      </Button>
     </Link>
    </nav>
  );
};

export default NavigationBar;

