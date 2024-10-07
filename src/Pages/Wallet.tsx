import React from 'react'
import Template from './sharedComp/RoulletteTemplate'
import { Button } from '@/components/ui/button'
import RRLOGO2 from "../assets/RR2.png"
function Wallet() {
  return (
    <Template>
         <div className="relative z-0 flex flex-col h-full bg-none  ">
              {/* Header area - you can add a title or other content here */}
              <div className="flex-none h-[40%] flex items-center justify-center relative">
              <img src={RRLOGO2} alt="logo" className="flex  justify-end items-end h-14 w-14 absolute top-6 right-3"/>
                <h1 className="text-2xl font-bold text-white">Best Players Rankings</h1>
              </div>
            <Button className='rounded-[2rem] w-fit px-[2rem]  mx-auto'>
                Connect Wallet 
            </Button>
            <h2 className='font-bold text-start text-white pl-3 mt-6'>
                Play and Win Rewards
            </h2>
            <p className='text-white text-start mt-4 mx-auto w-[90%]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolor corrupti earum s
                oluta officia libero fuga aperiam fugit recusandae.
                 Quaerat eum non quod nisi rerum, error iste voluptatibus illo optio.
            </p>
            <div className='h-[30%] flex justify-center items-center '>
                <Button className=' rounded-[2rem] bg-white text-[#191F57]'>
                    Having trouble?
                </Button>
            </div>
        </div>
    </Template>
  )
}

export default Wallet