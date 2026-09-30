import React from 'react';
import { ShieldCheck, Activity, Camera, Search, AlertCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectHeroShipment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onSelectHeroShipment,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-[1600px] mx-auto px-4">
        
        {/* Top Header Toolbar */}
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Operational Status */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-blue-700 text-white flex items-center justify-center font-black text-sm tracking-wider">
              CS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white">
                  CoalSync <span className="text-blue-400 font-extrabold">AI</span>
                </h1>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 uppercase">
                  Logistics Control Layer
                </span>
              </div>
            </div>
          </div>

          {/* Quick Hero Trigger & Search */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSelectHeroShipment}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition shadow-xs"
              title="Inspect CS-184 Hero Demo Consignment"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Demo Hero: CS-184 (Priority 91)
            </button>

            <div className="relative w-52 sm:w-64">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search shipment, mine, plant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-slate-800 text-slate-100 border border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-slate-900 placeholder-slate-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-t border-slate-800 pt-0.5">
          <button
            onClick={() => setActiveTab('command')}
            className={`flex items-center gap-2 py-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'command'
                ? 'border-blue-500 text-blue-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Command Center
          </button>

          <button
            onClick={() => setActiveTab('priority')}
            className={`flex items-center gap-2 py-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'priority'
                ? 'border-blue-500 text-blue-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
            Shipment Priority Engine
          </button>

          <button
            onClick={() => setActiveTab('cctv')}
            className={`flex items-center gap-2 py-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'cctv'
                ? 'border-blue-500 text-blue-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Camera className="h-3.5 w-3.5 text-amber-400" />
            CCTV Checkpoint CP-01
          </button>
        </div>

      </div>
    </header>
  );
};
