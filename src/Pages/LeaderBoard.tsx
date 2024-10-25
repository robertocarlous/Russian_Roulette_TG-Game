import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import RRLOGO2 from "../assets/RR2.png"
import Template from "./sharedComp/RoulletteTemplate";

// Array of SVG gaming avatars
const gameAvatars = [
  // Robot avatar
  <svg key="1" viewBox="0 0 36 36" className="w-8 h-8">
    <circle cx="18" cy="18" r="18" fill="#2563eb"/>
    <circle cx="18" cy="15" r="8" fill="#1d4ed8"/>
    <rect x="12" y="18" width="12" height="8" rx="4" fill="#1e40af"/>
    <circle cx="14" cy="13" r="2" fill="#white"/>
    <circle cx="22" cy="13" r="2" fill="white"/>
  </svg>,
  
  // Crypto coin avatar
  <svg key="2" viewBox="0 0 36 36" className="w-8 h-8">
    <circle cx="18" cy="18" r="18" fill="#15803d"/>
    <path d="M18 8 L23 12 L23 24 L18 28 L13 24 L13 12 Z" fill="#16a34a"/>
    <text x="18" y="21" fontSize="12" fill="white" textAnchor="middle">₮</text>
  </svg>,
  
  // Diamond avatar
  <svg key="3" viewBox="0 0 36 36" className="w-8 h-8">
    <circle cx="18" cy="18" r="18" fill="#7c3aed"/>
    <path d="M18 8 L26 16 L18 28 L10 16 Z" fill="#8b5cf6"/>
    <path d="M18 8 L26 16 L18 20 L10 16 Z" fill="#a78bfa"/>
  </svg>,
  
  // Star avatar
  <svg key="4" viewBox="0 0 36 36" className="w-8 h-8">
    <circle cx="18" cy="18" r="18" fill="#b91c1c"/>
    <path d="M18 8 L21 15 L28 15 L22 20 L24 27 L18 23 L12 27 L14 20 L8 15 L15 15 Z" fill="#dc2626"/>
  </svg>,
  
  // Shield avatar
  <svg key="5" viewBox="0 0 36 36" className="w-8 h-8">
    <circle cx="18" cy="18" r="18" fill="#0f766e"/>
    <path d="M18 8 L25 11 V19 C25 23 18 28 18 28 C18 28 11 23 11 19 V11 L18 8Z" fill="#14b8a6"/>
  </svg>
];

const leaderboardData = [
  { rank: 1, name: "FaryaAndWolyo", tokenWon: 1.0, played: 45, wins: 24, avatar: gameAvatars[0] },
  { rank: 2, name: "brüninho", tokenWon: 1.0, played: 42, wins: 18, avatar: gameAvatars[1] },
  { rank: 3, name: "brüninho", tokenWon: 1.0, played: 36, wins: 17, avatar: gameAvatars[2] },
  { rank: 4, name: "Salvyyy TFT", tokenWon: 1.0, played: 28, wins: 14, avatar: gameAvatars[3] },
  { rank: 5, name: "TFT Hadaf", tokenWon: 1.0, played: 26, wins: 12, avatar: gameAvatars[4] },
  { rank: 6, name: "Gingg", tokenWon: 1.0, played: 24, wins: 10, avatar: gameAvatars[0] },
  { rank: 7, name: "Salvyyy", tokenWon: 1.0, played: 32, wins: 10, avatar: gameAvatars[1] },
  { rank: 8, name: "Voltariusx", tokenWon: 1.0, played: 28, wins: 9, avatar: gameAvatars[2] },
  { rank: 9, name: "kingmust143", tokenWon: 1.0, played: 29, wins: 7, avatar: gameAvatars[3] },
  { rank: "+1M", name: "brüninho", tokenWon: 1.0, played: 35, wins: 7, avatar: gameAvatars[4] },
];

const Leaderboard = () => {
  return (
    <Template>
      <div className="relative z-0 flex flex-col h-full bg-none">
        {/* Header area */}
        <div className="flex-none h-[30%] flex items-center justify-center relative">
          <img src={RRLOGO2} alt="logo" className="flex justify-end items-end h-14 w-14 absolute top-6 right-3"/>
          <h1 className="text-2xl font-bold text-white">Best Players Rankings</h1>
        </div>
        
        {/* Table container with scrollable content */}
        <div className="flex-grow overflow-y-auto z-10">
          <Table>
            <TableBody>
              {leaderboardData.map((item, index) => (
                <TableRow 
                  key={index} 
                  className={`
                    ${index % 2 === 0 ? 'bg-[#191F57]' : 'bg-[#121639]/70'}
                    ${index === 0 ? 'animate-pulse border-l-4 border-yellow-500' : ''}
                    ${index === 1 ? 'border-l-4 border-gray-400' : ''}
                    ${index === 2 ? 'border-l-4 border-amber-700' : ''}
                  `}
                >
                  <TableCell className="font-medium w-8 text-white">
                    {index < 3 ? 
                      <span className={`
                        flex items-center justify-center w-6 h-6 rounded-full
                        ${index === 0 ? 'bg-yellow-500' : ''}
                        ${index === 1 ? 'bg-gray-400' : ''}
                        ${index === 2 ? 'bg-amber-700' : ''}
                      `}>
                        {item.rank}
                      </span> 
                      : item.rank
                    }
                  </TableCell>
                  <TableCell className="w-8">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1D1B4D] flex items-center justify-center">
                      {item.avatar}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-white">{item.name}</span>
                      <span className="text-xs text-gray-300">Token won {item.tokenWon}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs text-gray-300">
                    Played {item.played}
                    <br />
                    Wins {item.wins}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Template>
  );
};

export default Leaderboard;