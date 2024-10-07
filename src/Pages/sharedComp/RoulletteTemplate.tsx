import { Card } from '@/components/ui/card';
import RRLOGO from "../../assets/RRLOGO.png";



const Template = ({children}:{children:React.ReactNode}) => {
        return (
          <Card className="relative max-w-md w-full h-[85vh] flex flex-col border-none overflow-hidden">
            {/* Background image with blur effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-[#191F57] -z-10"
              style={{
                backgroundImage: `url(${RRLOGO})`,
                filter: 'blur(3px)',
                zIndex: 0
              }}
            />

              <div className="absolute inset-0 bg-[#191F57] opacity-70" />

            {/* Content container */}
            {children}
          </Card>
        );
};

export default Template;