import React from 'react'
import Template from './RoulletteTemplate'
import RRLOGO2 from "../../assets/RR2.png"
function PlayScreen() {
    const latestWin = 122 
  return (
    <Template>
    <div className='flex-none h-[20%] items-start justify-start text-white relative flex flex-col  px-3'>
    <img src={RRLOGO2} alt="logo" className="flex  justify-end items-end h-14 w-14 absolute top-4 right-3"/>
        <p className='flex-1 mt-[5rem] font-bold text-xl'>
         <span  className='text-red-600'> WIN  </span> 
         or LOSE
        </p>
        <p className=' text-xs mt-2'>
        Select a number pool and stand a chance to <span className='text-red-600 '>WIN BIG !!!</span>
        </p>
        <p className='flex-1 '>
        0x***cb0u0d.. Just won <span className='text-red-600 font-bold'>{latestWin} TON</span>
        </p>
        <div className='mt-[3rem] text-sm font-semibold'>
            <p>Click spin after selecting a number pool</p>
        </div>
        </div>
    </Template>
  )
}

export default PlayScreen