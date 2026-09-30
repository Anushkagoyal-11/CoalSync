import React, { useState, useEffect } from 'react';
import { LocationNode, Shipment, SystemStats, CCTVFrameDetection } from './types';
import { INITIAL_LOCATIONS, INITIAL_SHIPMENTS, INITIAL_STATS, INITIAL_CCTV, HERO_SHIPMENT_CS184 } from './data/sampleData';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { MapView } from './components/MapView';
import { PriorityQueue } from './components/PriorityQueue';
import { CCTVView } from './components/CCTVView';
import { ShipmentModal } from './components/ShipmentModal';
import { EventFeed } from './components/EventFeed';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('command');
  const [locations, setLocations] = useState<LocationNode[]>(INITIAL_LOCATIONS);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [stats, setStats] = useState<SystemStats>(INITIAL_STATS);
  const [cctvData, setCctvData] = useState<CCTVFrameDetection>(INITIAL_CCTV);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch backend data with immediate fallback
  useEffect(() => {
    async function fetchData() {
      try {
        const [shipRes, locRes, statsRes, cctvRes] = await Promise.allSettled([
          fetch('/api/shipments'),
          fetch('/api/locations'),
          fetch('/api/stats'),
          fetch('/api/cctv/current')
        ]);

        if (shipRes.status === 'fulfilled' && shipRes.value.ok) {
          const sData = await shipRes.value.json();
          if (Array.isArray(sData) && sData.length > 0) setShipments(sData);
        }
        if (locRes.status === 'fulfilled' && locRes.value.ok) {
          const lData = await locRes.value.json();
          if (Array.isArray(lData) && lData.length > 0) setLocations(lData);
        }
        if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
          const stData = await statsRes.value.json();
          if (stData && stData.total_active) setStats(stData);
        }
        if (cctvRes.status === 'fulfilled' && cctvRes.value.ok) {
          const cData = await cctvRes.value.json();
          if (cData && cData.detection_id) setCctvData(cData);
        }
      } catch (err) {
        console.log('Using offline data fallback:', err);
      }
    }

    fetchData();
  }, []);

  // Filter shipments based on search query
  const filteredShipments = shipments.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.id.toLowerCase().includes(q) ||
      s.origin.toLowerCase().includes(q) ||
      s.destination.toLowerCase().includes(q) ||
      (s.vehicle_id && s.vehicle_id.toLowerCase().includes(q))
    );
  });

  const heroShipment = shipments.find((s) => s.id === 'CS-184') || HERO_SHIPMENT_CS184;

  const handleSelectHero = () => {
    setSelectedShipment(heroShipment);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-900 selection:bg-blue-700 selection:text-white">
      
      {/* Enterprise Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectHeroShipment={handleSelectHero}
      />

      {/* Main Operations Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 py-4 space-y-4">
        
        {/* Operational Status KPI Summary */}
        <StatsOverview stats={stats} />

        {/* Tab 1: Operations Command Center */}
        {activeTab === 'command' && (
          <div className="space-y-4">
            
            {/* Primary GIS Map & Secondary Live Event Log */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              {/* GIS Map (Primary Visual Focus) */}
              <div className="lg:col-span-2 bg-white rounded-md border border-slate-300 shadow-xs p-3 flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-700"></span>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      National Coal Corridor GIS Operations Map (MapLibre)
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Mines • Sidings • Checkpoints • Power Plants
                  </span>
                </div>
                
                <div className="flex-1 min-h-[480px]">
                  <MapView
                    locations={locations}
                    shipments={filteredShipments}
                    selectedShipmentId={selectedShipment?.id}
                    onSelectShipment={(s) => setSelectedShipment(s)}
                  />
                </div>
              </div>

              {/* Live Event Stream Log */}
              <div className="space-y-4">
                <EventFeed onSelectShipmentId={(id) => {
                  const s = shipments.find((item) => item.id === id);
                  if (s) setSelectedShipment(s);
                }} />

                {/* Quick Critical Consignment Focus */}
                <div className="bg-white rounded-md border border-slate-300 shadow-xs p-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Critical Attention Consignments
                    </h3>
                    <button
                      onClick={() => setActiveTab('priority')}
                      className="text-[11px] font-bold text-blue-700 hover:underline"
                    >
                      Full Queue &rarr;
                    </button>
                  </div>
                  <div className="space-y-2">
                    {filteredShipments.slice(0, 3).map((ship) => (
                      <div
                        key={ship.id}
                        onClick={() => setSelectedShipment(ship)}
                        className={`p-2.5 rounded border text-xs cursor-pointer flex items-center justify-between ${
                          ship.id === 'CS-184'
                            ? 'bg-red-50 border-red-300 font-semibold'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{ship.id}</span>
                            {ship.id === 'CS-184' && (
                              <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                                DEMO HERO
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-600 truncate mt-0.5">
                            To: {ship.destination}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            ship.priority.score >= 81 ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
                          }`}>
                            {ship.priority.score}/100
                          </span>
                          <div className="text-[10px] text-slate-500 mt-1">
                            {ship.destination_inventory_hours}h stock
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* AI Priority Engine Queue */}
            <PriorityQueue
              shipments={filteredShipments}
              onSelectShipment={(s) => setSelectedShipment(s)}
            />
          </div>
        )}

        {/* Tab 2: Full Priority Engine Queue */}
        {activeTab === 'priority' && (
          <PriorityQueue
            shipments={filteredShipments}
            onSelectShipment={(s) => setSelectedShipment(s)}
          />
        )}

        {/* Tab 3: Dedicated CCTV View */}
        {activeTab === 'cctv' && (
          <CCTVView
            cctvData={cctvData}
            heroShipment={heroShipment}
            onInspectShipment={(s) => setSelectedShipment(s)}
          />
        )}

      </main>

      {/* Shipment Detail Modal */}
      <ShipmentModal
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onOpenCCTV={() => setActiveTab('cctv')}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 mt-6">
        <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div>CoalSync AI • Physical Logistics Intelligence Layer</div>
          <div>Operational Status: ONLINE • System Verified</div>
        </div>
      </footer>

    </div>
  );
}
