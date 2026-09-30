import React, { useState, useEffect } from 'react';
import { JourneyEvent } from '../types';
import { ShieldCheck, Radio, Camera, Scale, Train, MapPin, RefreshCw } from 'lucide-react';

interface EventFeedProps {
  onSelectShipmentId: (shipmentId: string) => void;
}

export const EventFeed: React.FC<EventFeedProps> = ({ onSelectShipmentId }) => {
  const [liveEvents, setLiveEvents] = useState<JourneyEvent[]>([
    {
      id: "EV-LIVE-1",
      timestamp: new Date().toLocaleTimeString(),
      location: "Mahanadi Checkpoint CP-01",
      event_type: "CCTV Physical Verification",
      source: "CCTV",
      verified: true,
      verification_details: "Truck OD-14-B-1840 matched with manifest CS-184 (Conf 94%)"
    },
    {
      id: "EV-LIVE-2",
      timestamp: new Date(Date.now() - 40000).toLocaleTimeString(),
      location: "Weighbridge WB-04 (Talcher)",
      event_type: "Gross Weight Measured",
      source: "WEIGHBRIDGE",
      verified: true,
      verification_details: "Gross: 44.2t, Net Coal: 32.0t (CS-184)"
    },
    {
      id: "EV-LIVE-3",
      timestamp: new Date(Date.now() - 90000).toLocaleTimeString(),
      location: "Katni Rail Corridor",
      event_type: "Telematics Speed Alert",
      source: "GPS",
      verified: true,
      verification_details: "Consignment CS-120 Rail Rake crossing Katni Jn"
    },
    {
      id: "EV-LIVE-4",
      timestamp: new Date(Date.now() - 150000).toLocaleTimeString(),
      location: "Korba Checkpoint CP-02",
      event_type: "CCTV Vehicle Detection",
      source: "CCTV",
      verified: true,
      verification_details: "Consignment CS-112 Verified by CAM-CP-02"
    }
  ]);

  // Periodic polling simulation per requirement 3 (No WebSockets / Redis)
  useEffect(() => {
    const interval = setInterval(() => {
      const sampleSimulatedEvents = [
        {
          id: `EV-LIVE-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          location: "Mahanadi Checkpoint CP-01",
          event_type: "CCTV Camera Pass Verified",
          source: "CCTV" as const,
          verified: true,
          verification_details: "Truck OD-14-B-1840 verified on CCTV feed CAM-CP-01"
        },
        {
          id: `EV-LIVE-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          location: "Jharsuguda Railway Siding",
          event_type: "Rake Loading Commenced",
          source: "RAILWAY" as const,
          verified: true,
          verification_details: "CS-184 queued for NTPC Dadri Rake loading"
        },
        {
          id: `EV-LIVE-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          location: "State Highway 15 Gate",
          event_type: "GPS Geofence Crossing",
          source: "GPS" as const,
          verified: true,
          verification_details: "Truck CS-170 crossed outward geofence"
        }
      ];

      const newEv = sampleSimulatedEvents[Math.floor(Math.random() * sampleSimulatedEvents.length)];
      setLiveEvents((prev) => [newEv, ...prev.slice(0, 7)]);
    }, 6000); // refresh every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4">
      
      {/* Feed Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-emerald-600 animate-pulse" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Live Multimodal Event Log
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
          <RefreshCw className="h-3 w-3 animate-spin text-slate-400" />
          Periodic Stream (No WS)
        </span>
      </div>

      {/* Events List */}
      <div className="space-y-2.5 max-h-[320px] overflow-y-auto">
        {liveEvents.map((ev) => {
          let SourceIcon = Radio;
          let iconBg = 'bg-blue-50 text-blue-600';

          if (ev.source === 'CCTV') {
            SourceIcon = Camera;
            iconBg = 'bg-emerald-50 text-emerald-600';
          } else if (ev.source === 'WEIGHBRIDGE') {
            SourceIcon = Scale;
            iconBg = 'bg-amber-50 text-amber-600';
          } else if (ev.source === 'RAILWAY') {
            SourceIcon = Train;
            iconBg = 'bg-sky-50 text-sky-600';
          }

          return (
            <div
              key={ev.id}
              className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition text-xs flex items-start gap-2.5"
            >
              <div className={`p-1.5 rounded-md ${iconBg} shrink-0 mt-0.5`}>
                <SourceIcon className="h-3.5 w-3.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-slate-900 truncate">{ev.event_type}</span>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{ev.timestamp}</span>
                </div>

                <div className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span className="truncate">{ev.location}</span>
                </div>

                {ev.verification_details && (
                  <p className="text-[10px] text-slate-500 font-mono mt-1 bg-white p-1 rounded border border-slate-200/60 truncate">
                    {ev.verification_details}
                  </p>
                )}
              </div>

              {ev.verified && (
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-1" title="Physically Verified" />
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
