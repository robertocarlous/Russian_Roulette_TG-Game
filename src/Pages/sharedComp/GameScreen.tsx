import React from 'react'
import Template from './RoulletteTemplate'
import RRLOGO2 from "../../assets/RR2.png"
import RRLogoSmall from "../../assets/RR.png"
import { Card, CardHeader } from '@/components/ui/card'
function GameScreen() {
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
        <img src={RRLOGO2} alt="logo" className="flex  justify-end items-end h-14 w-14 absolute top-4 right-3"/>
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