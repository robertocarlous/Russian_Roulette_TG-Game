import Template from './RoulletteTemplate'
import RRLOGO2 from "../../assets/RR2.png"
import RRLogoSmall from "../../assets/RR.png"
import { Card, CardHeader } from '@/components/ui/card'
import { initializeWebApp } from '@/Authenticator';
import WelcomeComponent from './Welcome';
import { useEffect } from 'react';
import { userAuth } from '@/apis/userAuth';
function GameScreen() {
    const userData = initializeWebApp();
    const data =  userData?.firstName
    useEffect(()=>{
        userAuth({
            id:userData?.id,
            first_name:userData?.firstName,
            last_name:userData?.lastName,
            photo_url:userData?.photoUrl,
            auth_data: new Date(),
            hash:userData?.hash
        })
    },[userData?.firstName, userData?.hash, userData?.id, userData?.lastName, userData?.photoUrl])
    const stakeAmount = [
        { value: 1, label: '1BRE' },
        { value: 2, label: '0.1BRE' },
        { value: 3, label: '1.12BRE' },
        { value: 4, label: '2BRE' },
        { value: 5, label: '2.5BRE' },
        { value: 6, label: '5BRE' },
        { value: 7, label: '10BRE' },
    ]
  return (
    <Template>
        <div className='flex-none h-[98%] items-start justify-start text-white relative flex flex-col my-auto px-3'>
            <div>
            <WelcomeComponent data={data}/>
            <img src={RRLOGO2} alt="logo" className="flex  justify-end items-end h-14 w-14 absolute top-4 right-3"/>
            </div>
            <h2 className='mt-[5rem] font-bold text-xl'>
                Available Games
            </h2>
            <p className="text-sm flex-1">
                Click and Join to <span className="text-red-600 font-bold">WIN BIG !!!</span>
            </p>
            <div className='grid grid-cols-2 gap-4 mt-6 overflow-y-auto'>
                {
                    stakeAmount.map((option) => (
                        <Card key={option.value} className="flex  w-full bg-[#191F57]">
                            <CardHeader>
                            <img src={RRLogoSmall} alt="logo" className="h-19 w-15 bg-cover"/>
                                <div className="flex flex-col items-center space-x-2 ">
                                    <h3 className="text-sm font-semibold text-start text-white">Stake and Win</h3>
                                </div>
                                <p className="text-xs text-red-400 text-start  font-bold"> {option.label}</p>
                            </CardHeader>
                        </Card>
                    ))
                }
            </div>
        </div>
    </Template>
  )
}

export default GameScreen