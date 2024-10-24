import { Card } from '@/components/ui/card';
import RRLOGO from "../../assets/RRLOGO.png";

const Template = ({children}:{children:React.ReactNode}) => {
  return (
    <Card className="relative md:max-w-md w-full h-[85vh] flex flex-col border-none overflow-hidden">
      {/* Background layers */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-[#191F57]"
        style={{
          backgroundImage: `url(${RRLOGO})`,
          filter: 'blur(3px)',
          zIndex: 0
        }}
      />
      <div className="absolute inset-0 bg-[#191F57] opacity-70 z-[1]" />
      
      {/* Content container */}
      <div className="relative z-[2] h-full overflow-y-auto">
        {children}
      </div>
    </Card>
  );
};

export default Template;