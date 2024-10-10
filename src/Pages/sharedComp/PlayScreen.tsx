import React, { useRef, useState } from 'react'
import Template from './RoulletteTemplate'
import RRLOGO2 from "../../assets/RR2.png"
import picker from "../../assets/picker.png"
import {motion} from 'framer-motion'
import whiteMarker from "../../assets/whiteMarker.png"

function PlayScreen() {
    const [isSpinning, setIsSpinning] = useState(false)
    const [currentRotation, setCurrentRotation] = useState(90)
    // Use a ref to track the actual rotation including all previous spins
    const totalRotationRef = useRef(90)

    const generateSpinParameters = () => {
        // Random number of complete rotations (5-10 spins)
        const spins = 5 + Math.floor(Math.random() * 5)
        
        // Random additional angle (0-359 degrees)
        const additionalAngle = Math.floor(Math.random() * 360)
        
        // Calculate total rotation from current position
        const newRotation = totalRotationRef.current + (spins * 360) + additionalAngle
        
        // Random duration between 4 and 6 seconds
        const duration = 4 + Math.random() * 2
        
        return {
            targetRotation: newRotation,
            duration: duration,
            spins: spins
        }
    }

    const handleSpinning = () => {
        if (!isSpinning) {
            const newRotationData = generateSpinParameters()
            setIsSpinning(true)
            
            // Update the current rotation
            setCurrentRotation(newRotationData.targetRotation)
            // Store the new total rotation
            totalRotationRef.current = newRotationData.targetRotation

            setTimeout(() => {
                setIsSpinning(false)
                // Calculate the final position (0-359 degrees)
                const finalPosition = newRotationData.targetRotation % 360
                const segment = Math.floor(finalPosition / (360 / pickers.length))
                console.log(`Landed on segment: ${pickers[segment].title}`)
            }, newRotationData.duration * 1000)
        }
    }

  // const pickers =Array(6).fill(null)
    const latestWin = 122 
    const pickers  = [
      {picker:picker, title:"player 1"},
      {picker:picker, title:"player 2"},
      {picker:picker, title:"player 3"},
      {picker:picker, title:"player 4"},
      {picker:picker, title:"player 5"},
      {picker:picker, title:"player 6"},
    ];
    const customEasing = [0.2, 0, 0.2, 1]
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
       <div className="flex justify-center mt-[2rem] mx-auto">
      
      <div className='relative mx-auto items-center  w-64 h-64'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 z-10 w-8 h-8 marker'>
        <img src={whiteMarker} alt="" />
      </div>
      <motion.div className="relative w-full h-full  "
        animate={{
          rotate: currentRotation
      }}
      transition={{
          duration: isSpinning ? 4 + Math.random() * 2 : 0,
          ease: customEasing,
          type: "tween"
      }}
      initial={false}
       >
        <div className="absolute inset-0 border-4 border-red-600 rounded-full">
        </div>
        <div className='relative -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-14 h-16 bg-white rounded-full border-2 border-blue-700 '>
        {pickers.map((picker, index) => {
        const angle = (index * (360 / pickers.length) - 90) * (Math.PI / 180); // Start from top (90 degrees)
        const radius = 100; // Adjust this value to change the circle size
        const x = Math.cos(angle) * radius + 50; // 50 is to center (50%)
        const y = Math.sin(angle) * radius + 50;
        
        return (
          <div
            key={index}
            className={`absolute  flex items-center justify-center w-16 h-16 text-sm -z-10    text-white  rounded-full`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
         <div className='relative'>
         <img src={picker.picker} alt='picker' className={`  ${index == 1 ? ' transform rotate-45 mb-[-3px] ' : index == 2 ? ' rotate-125' :  index == 3 ? ' rotate-180' : index == 4 ? ' rotate-225': index == 5 ? 'rotate-300' : ''}`}  />
          <p className={` text-[0.75rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold  ${ index == 0 ||index == 5    ? '-mt-1 -m-1' :  'mt-[0.3rem]' }`}>
          {picker.title}
  
          </p>
          </div>
          </div>
        );
      })}
        </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-blue-950 font-bold   flex items-center justify-center bg-white rounded-full border-2 border-blue-700'>
        <button onClick={handleSpinning}>
        <p >SPIN</p>
        </button>
        </div>
        </motion.div>
      </div>
        </div>
       </div>
        {/* </div> */}
    </Template>
  )
}

export default PlayScreen