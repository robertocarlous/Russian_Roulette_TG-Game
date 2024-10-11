/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserCircle } from 'lucide-react';

const WelcomeComponent = ({ data }:{data:any}) => {
  return (
    <div className="mt-2 absolute top-4 left-2 flex items-center bg-blue-800 rounded-full py-2 px-4 shadow-lg hover:bg-slate-700 transition-colors duration-200">
      <UserCircle className="text-slate-300 mr-2" size={20} />
      <p className="text-sm font-bold text-slate-100">
        {data ? `Welcome, ${data}!` : 'Connect your account'}
      </p>
    </div>
  );
};

export default WelcomeComponent;