import Template from './sharedComp/RoulletteTemplate'
import { Button } from '@/components/ui/button'
import RRLOGO2 from "../assets/RR2.png"
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react'
import FaucetClaim from './sharedComp/FaucetClaims';

function Wallet() {
  const rawAddress = useTonAddress(false);

  // const handleFaucetClaim = () => {
  //   if (!rawAddress) {
  //     console.error('No wallet connected');
  //     return;
  //   }
  //   console.log('Claiming tokens for address:', rawAddress);
  //   // Add your faucet claim implementation here
  // };

  return (
    <Template>
      <div className="relative z-0 flex flex-col h-full bg-none">
        <div className="flex-none h-[40%] flex items-center justify-center relative">
          <img src={RRLOGO2} alt="logo" className="flex justify-end items-end h-14 w-14 absolute top-6 right-3"/>
          <h1 className="text-2xl font-bold text-white">Best Players Rankings</h1>
        </div>

        {rawAddress ? (
          <>
             <TonConnectButton className='mt-6 text-center text-white text-sm flex gap-5 rounded-[2rem] w-fit px-[2rem] mx-auto py-2'/>
            
          </>
        ) : (
          <TonConnectButton className='rounded-[2rem] w-fit px-[2rem] mx-auto'/>
        )}

        <h2 className='font-bold text-start text-white pl-3 mt-6'>
          Play and Win Rewards
        </h2>
        <p className='text-white text-start text-[0.7rem] mt-4 mx-auto w-[90%]'>
          Connect your TON wallet to start playing and competing for rewards. Top players earn tokens based on their performance and ranking position. Join now and climb the leaderboard!
        </p>
        <div className='h-[30%] flex justify-center items-center'>
          <Button className='rounded-[2rem] bg-white text-[#191F57]'>
            Having trouble?
          </Button>
        </div>
      </div>
      <FaucetClaim/>
    </Template>
  )
}

export default Wallet