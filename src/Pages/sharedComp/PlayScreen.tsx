/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import Template from './RoulletteTemplate';
import RRLOGO2 from "../../assets/RR2.png";
import WelcomeComponent from './Welcome';
import { Toaster, toast } from 'sonner';
import { soundManager } from "../../lib/soundManager.ts";
import { initializeWebApp, UserData } from '@/Authenticator.ts';
import NumberRangeGrid from './NumberRange.tsx';
import { useTonAddress } from '@tonconnect/ui-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from 'react-redux';
import { deductSpinCost } from '@/slices/faucetSlice.ts';

function PlayScreen() {
    const dispatch = useDispatch();
    const balance = useSelector((state: { faucet: { balance: number } }) => state.faucet.balance);
    
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const [showBalanceDialog, setShowBalanceDialog] = useState(false);
    const [userdata, setUserdata] = useState<UserData | null>(null);
    const [currentPlayers, setCurrentPlayers] = useState<string[]>([]);
    const [selectedRange, setSelectedRange] = useState<string | null>(null);
    
    const rawAddress = useTonAddress();
    const latestWin = 7;

    const playerNames = [
      "KyroLexo", "märtinho", "TFT Zenox", "Ryzeyyy", "Azähir",
      "VoltrixPro", "Syndraaa", "LuxAndMorg", "Därkness", "Nüjablade",
      "Kaynzyyy", "AstraalTFT", "Jinxxed", "Zëphyr", "krönen",
      "TFT Mystic", "Vorpalxx", "Rüneterran"
    ];

    const getRandomPlayers = () => {
      const shuffled = [...playerNames].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 2);
    };

    useEffect(() => {
      const user = initializeWebApp();
      setUserdata(user);
      setCurrentPlayers(getRandomPlayers());
    }, [mustSpin]);

    const data = [
      { option: currentPlayers[0]?.slice(0, 9) || 'Player one' },
      { option: currentPlayers[1]?.slice(0, 9) || 'Player two' },
      { option: userdata ? `${userdata?.firstName} (You)` : 'Player three' },
    ];

    const handleSpinClick = async () => {
      if (!rawAddress || !userdata) {
        setShowAuthDialog(true);
        return;
      }

      if (Number(balance) < 5) {
        setShowBalanceDialog(true);
        return;
      }

      if (!selectedRange) {
        toast.error('Please select a number range first!');
        return;
      }

      if (!mustSpin) {
        try {
          dispatch(deductSpinCost());
          
          const newPrizeNumber = Math.floor(Math.random() * data.length);
          setPrizeNumber(newPrizeNumber);
          setMustSpin(true);
          soundManager.play('spin');
        } catch (error) {
          console.error('Failed to place bet:', error);
          toast.error('Failed to place bet. Please try again.');
        }
      }
    };

    const handleStopSpinning = async () => {
      setMustSpin(false);
      setSelectedRange(null);
      const winner = data[prizeNumber].option;
      
      soundManager.stop('spin');
      soundManager.play('win');

      setCurrentPlayers(getRandomPlayers());

      toast.custom((t:any) => (
        <div className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-[#1D1B4D] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  Winner Announcement!
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {winner} has won the spin!
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Cost: 5 TON | New Balance: {balance} TON
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-700">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'top-center',
      });
    };

    return (
      <Template>
          <Toaster richColors />
          <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
            <DialogContent className="sm:max-w-[425px] bg-[#1D1B4D] text-white">
              <DialogHeader>
                <DialogTitle>Authentication Required</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Please sign in to play the game and win amazing prizes!
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <p className="text-sm text-gray-300">
                  Sign in to:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Spin the wheel</li>
                    <li>Win TON tokens</li>
                    <li>Track your winnings</li>
                    <li>Compete with other players</li>
                  </ul>
                </p>
                <button
                  onClick={() => setShowAuthDialog(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showBalanceDialog} onOpenChange={setShowBalanceDialog}>
            <DialogContent className="sm:max-w-[425px] bg-[#1D1B4D] text-white">
              <DialogHeader>
                <DialogTitle>Insufficient Balance</DialogTitle>
                <DialogDescription className="text-gray-300">
                  You need at least 2 TON to play. Your current balance is {balance} TON.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <p className="text-sm text-gray-300">
                  Please claim tokens from the faucet to continue playing.
                </p>
                <button
                  onClick={() => setShowBalanceDialog(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </DialogContent>
          </Dialog>

          <div className='min-h-screen max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8'>
              <div className='w-full relative'>
                <WelcomeComponent data={userdata?.firstName}/>
                <img 
                  src={RRLOGO2} 
                  alt="logo" 
                  className="absolute top-4 right-3 h-14 w-14"
                />
              </div>
  
              <div className='w-full text-center mt-[5rem] space-y-4'>
                  <p className='font-bold text-xl text-white'>
                      <span className='text-red-600'>WIN</span> or LOSE
                  </p>
                  <p className='text-xs text-white'>
                      Select a number pool and stand a chance to 
                      <span className='text-red-600'> WIN BIG !!!</span>
                  </p>
                  <p className='text-white'>
                      Balance: <span className='text-red-600 font-bold'>{balance} TON</span>
                  </p>
                  <p className='text-white'>
                      0x***cb0u0d.. Just won 
                      <span className='text-red-600 font-bold'> {latestWin} TON</span>
                  </p>
                  <div className='text-sm font-semibold text-white'>
                      <p>Click spin after selecting a number pool</p>
                  </div>
              </div>

              <div className="w-full mt-6">
                <NumberRangeGrid onSelectRange={setSelectedRange} selectedRange={selectedRange} />
              </div>

              <div className='w-full flex justify-center items-center mt-8 mb-8'>
                  <div className='relative w-full max-w-[300px] aspect-square'>
                      <div className='w-full h-full'>
                          <Wheel
                              mustStartSpinning={mustSpin}
                              prizeNumber={prizeNumber}
                              data={data}
                              onStopSpinning={handleStopSpinning}
                              backgroundColors={['#FF4136','#89100a','#ce1e14']}
                              textColors={['#FFFFFF']}
                              outerBorderColor="#FF4136"
                              outerBorderWidth={5}
                              innerRadius={40}
                              innerBorderColor="#1D1B4D"
                              innerBorderWidth={5}
                              radiusLineColor="#1D1B4D"
                              radiusLineWidth={2}
                              fontSize={16}
                              textDistance={65}
                          />
                      </div>
  
                      <button 
                          onClick={handleSpinClick}
                          disabled={mustSpin || !selectedRange}
                          className={`
                              absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              bg-[#1D1B4D] text-white rounded-full
                              w-20 h-20 font-bold z-10
                              transition-all duration-200
                              hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-red-600
                              ${mustSpin || !selectedRange ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                          `}
                      >
                        <p className='text-sm'>
                          {mustSpin ? 'SPINNING...' : !selectedRange ? 'SELECT RANGE' : 'SPIN'}
                        </p>
                      </button>
                  </div>
              </div>
          </div>
      </Template>
    );
}

export default PlayScreen;