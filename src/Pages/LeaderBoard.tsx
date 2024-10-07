
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import RRLOGO2 from "../assets/RR2.png"
import Template from "./sharedComp/RoulletteTemplate";
const leaderboardData = [
  { rank: 1, name: "FaryaAndWolyo", tokenWon: 1.0, played: 355, wins: 104 },
  { rank: 2, name: "brüninho", tokenWon: 1.0, played: 602, wins: 127 },
  { rank: 3, name: "brüninho", tokenWon: 1.0, played: 438, wins: 99 },
  { rank: 4, name: "Salvyyy TFT", tokenWon: 1.0, played: 418, wins: 102 },
  { rank: 5, name: "TFT Hadaf", tokenWon: 1.0, played: 450, wins: 117 },
  { rank: 6, name: "Gingg", tokenWon: 1.0, played: 328, wins: 83 },
  { rank: 7, name: "Salvyyy", tokenWon: 1.0, played: 298, wins: 78 },
  { rank: 8, name: "Voltariusx", tokenWon: 1.0, played: 432, wins: 80 },
  { rank: 9, name: "kingmust143", tokenWon: 1.0, played: 198, wins: 57 },
  { rank: "+1M", name: "brüninho", tokenWon: 1.0, played: 602, wins: 127 },
];

const Leaderboard = () => {
        return (
     <Template>
        <div className="relative z-0 flex flex-col h-full bg-none  ">
              {/* Header area - you can add a title or other content here */}
              <div className="flex-none h-[30%] flex items-center justify-center relative">
              <img src={RRLOGO2} alt="logo" className="flex  justify-end items-end h-14 w-14 absolute top-6 right-3"/>
                <h1 className="text-2xl font-bold text-white">Best Players Rankings</h1>
              </div>
              
              {/* Table container with scrollable content */}
              <div className="flex-grow overflow-y-auto z-10">
                <Table>
                  <TableBody>
                    {leaderboardData.map((item, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? 'bg-[#191F57]' : 'bg-[#121639]/70'}>
                        <TableCell className="font-medium w-8 text-white">{item.rank}</TableCell>
                        <TableCell className="w-8">
                          <img src={`/api/placeholder/32/32`} alt="Avatar" className="w-6 h-6 rounded-full" />
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