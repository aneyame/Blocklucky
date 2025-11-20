import { useState, useEffect, useRef } from "react";
import { DollarSign, Users, Trophy, Play, ArrowLeft, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";

interface LotteryResult {
  ticketNumber: number;
  prize: string;
  type: "big" | "small";
}

export function ManagerDashboard({ onBack }: { onBack: () => void }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [results, setResults] = useState<LotteryResult[]>([]);
  const [currentDraw, setCurrentDraw] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Fake data
  const stats = {
    totalDonations: 1247,
    totalValueETH: 42.5,
    totalValueEUR: 89250,
    averageDonation: 0.034
  };

  // Prize pools
  const bigPrizes = [
    "1 ETH",
    "0.5 ETH",
    "0.3 ETH",
    "0.25 ETH",
    "0.2 ETH",
    "0.15 ETH",
    "0.1 ETH",
    "500€ en Bitcoin",
    "300€ en Bitcoin",
    "200€ en Bitcoin"
  ];

  const smallPrizes = [
    "50€",
    "40€",
    "30€",
    "25€",
    "20€",
    "15€",
    "10€",
    "5€"
  ];

  const handleDrawLottery = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsDrawing(true);
    setResults([]);
    
    const drawResults: LotteryResult[] = [];
    const usedTickets = new Set<number>();

    // Generate unique random ticket numbers
    const getUniqueTicket = () => {
      let ticket: number;
      do {
        ticket = Math.floor(Math.random() * 10000) + 1;
      } while (usedTickets.has(ticket));
      usedTickets.add(ticket);
      return ticket;
    };

    // First 10 are big prizes
    for (let i = 0; i < 10; i++) {
      drawResults.push({
        ticketNumber: getUniqueTicket(),
        prize: bigPrizes[i],
        type: "big"
      });
    }

    // Remaining 556 are small prizes
    for (let i = 0; i < 556; i++) {
      drawResults.push({
        ticketNumber: getUniqueTicket(),
        prize: smallPrizes[Math.floor(Math.random() * smallPrizes.length)],
        type: "small"
      });
    }

    // Simulate progressive reveal
    let count = 0;
    intervalRef.current = setInterval(() => {
      if (count < drawResults.length) {
        const newResult = drawResults[count];
        if (newResult) {
          setResults(prev => [...prev, newResult]);
        }
        count++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsDrawing(false);
        setCurrentDraw(prev => prev + 1);
      }
    }, 50); // Reveal one every 50ms
  };

  return (
    <div className="min-h-screen bg-black py-24 px-6">
      {/* Background effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8A1C26]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#E1B051]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-[#E1B051] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </button>
          <h1 className="text-4xl md:text-5xl text-white mb-2">
            Tableau de bord Manager
          </h1>
          <p className="text-gray-400">
            Gérez la loterie et suivez les statistiques en temps réel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black border-[#E1B051]/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#E1B051]/10 border border-[#E1B051]/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#E1B051]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total de donations</p>
            <p className="text-3xl text-white">{stats.totalDonations.toLocaleString()}</p>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black border-[#8A1C26]/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#8A1C26]/10 border border-[#8A1C26]/30 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#8A1C26]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Valeur totale (ETH)</p>
            <p className="text-3xl text-white">{stats.totalValueETH} ETH</p>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black border-[#E1B051]/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#E1B051]/10 border border-[#E1B051]/30 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#E1B051]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Valeur totale (EUR)</p>
            <p className="text-3xl text-white">{stats.totalValueEUR.toLocaleString()}€</p>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-black border-[#8A1C26]/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#8A1C26]/10 border border-[#8A1C26]/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#8A1C26]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Donation moyenne</p>
            <p className="text-3xl text-white">{stats.averageDonation} ETH</p>
          </Card>
        </div>

        {/* Lottery Draw Section */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black border-[#E1B051]/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-white mb-2">Tirage au sort</h2>
              <p className="text-gray-400 text-sm">
                Cliquez pour lancer un nouveau tirage de 566 gagnants
              </p>
            </div>
            <button
              onClick={handleDrawLottery}
              disabled={isDrawing}
              className={`px-8 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                isDrawing
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-[#6E0E1A] hover:bg-[#8A1C26] text-white shadow-lg hover:shadow-xl hover:shadow-[#8A1C26]/40'
              }`}
            >
              <Play className={`w-5 h-5 ${isDrawing ? 'animate-spin' : ''}`} />
              {isDrawing ? 'Tirage en cours...' : 'Lancer le tirage'}
            </button>
          </div>

          {currentDraw > 0 && (
            <div className="mb-4 px-4 py-2 rounded-lg bg-[#E1B051]/10 border border-[#E1B051]/30 inline-flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#E1B051]" />
              <span className="text-[#E1B051] text-sm">
                Tirage #{currentDraw} terminé - {results.length} gagnants
              </span>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-white">Résultats ({results.length}/566)</h3>
                {isDrawing && (
                  <div className="flex items-center gap-2 text-[#E1B051]">
                    <div className="w-2 h-2 rounded-full bg-[#E1B051] animate-pulse" />
                    <span className="text-sm">Tirage en cours...</span>
                  </div>
                )}
              </div>
              
              <div className="max-h-96 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {results.filter(result => result && result.type && result.ticketNumber && result.prize).map((result, index) => (
                  <div
                    key={`${result.ticketNumber}-${index}`}
                    className={`p-3 rounded-lg border flex items-center justify-between ${
                      result.type === 'big'
                        ? 'bg-[#E1B051]/5 border-[#E1B051]/30'
                        : 'bg-gray-800/30 border-gray-700/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {result.type === 'big' && (
                        <Trophy className="w-5 h-5 text-[#E1B051]" />
                      )}
                      <span className={`${
                        result.type === 'big' ? 'text-white' : 'text-gray-300'
                      }`}>
                        Ticket #{result.ticketNumber.toString().padStart(5, '0')}
                      </span>
                    </div>
                    <span className={`${
                      result.type === 'big' ? 'text-[#E1B051]' : 'text-gray-400'
                    }`}>
                      {result.prize}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(225, 176, 81, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(225, 176, 81, 0.5);
        }
      `}</style>
    </div>
  );
}