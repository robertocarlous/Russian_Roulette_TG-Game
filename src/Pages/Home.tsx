import { Card, CardContent} from "@/components/ui/card"
import RRLOGO from "../assets/RRLOGO.png"
import RRLOGO2 from "../assets/RR2.png"
import { useEffect, useState } from "react"
import Blogo from "../assets/BREEVS.png"
function Home() {
    const [opacity,setOpacity] = useState(1)
    useEffect(()=>{
        const interval = setInterval(()=>{
            setOpacity((prev)=> prev === 1 ? 0.6 : 1)
        },700)
        return ()=> clearInterval(interval)
    },[])
  return (
    <div>
        <Card className="relative max-w-md w-full min-h-[80vh] bg-[#191F57] flex  items-center border-none">
            {/* Pseudo-element for blur effect */}
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `url(${RRLOGO})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                filter: 'blur(2px)', // Adjust blur amount here
                zIndex: 0 // Place this behind other content
              }} 
            />
            <CardContent className=" z-10 w-[20rem] h-full flex items-center justify-center pt-[4rem] relative"  style={{backgroundImage:`url(${RRLOGO2})`,backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
              <p className="loading-text pt-[7.5rem] text-red-600 transition-opacity duration-700 ease-in-out  " style={{opacity:opacity} }>
                Loading...
              </p>
            </CardContent>
        </Card>
        <div className="flex items-center justify-center text-white gap-3">
    <p className="m-0 mb-2 font-semibold">Product of</p>
    <img src={Blogo} alt="Breevs" className="h-[3rem] w-[3rem]"/>
</div>

    </div>
  )
}

export default Home
