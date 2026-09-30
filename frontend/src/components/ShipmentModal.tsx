import React from 'react';
import { Shipment } from '../types';
import { X, ShieldCheck, CheckCircle2, Clock, AlertTriangle, MapPin, Truck, Camera, ChevronRight, FileText } from 'lucide-react';

interface ShipmentModalProps {
  shipment: Shipment | null;
  onClose: () => void;
  onOpenCCTV: () => void;
}

export const ShipmentModal: React.FC<ShipmentModalProps> = ({
  shipment,
  onClose,
  onOpenCCTV,
}) => {
  if (!shipment) return null;

  const score = shipment.priority.score;
  const isCritical = score >= 81;
  const isHero = shipment.id === 'CS-184';

  const delayHrs = Math.floor(shipment.delay_minutes / 60);
  const delayMins = shipment.delay_minutes % 60;
  const delayText = shipment.delay_minutes > 0 ? `${delayHrs}h ${delayMins}m` : 'On Time';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-600 text-white font-bold text-lg">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold tracking-tight">{shipment.id}</h3>
                {isHero && (
                  <span className="bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded tracking-wide animate-pulse">
                    HERO CONSIGNMENT
                  </span>
                )}
                <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded font-mono">
                  {shipment.cargo_type || 'Non-Coking Coal'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {shipment.origin} → {shipment.destination} • {shipment.transport_mode} Transport
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Priority Score</div>
              <div className={`text-2xl font-black ${isCritical ? 'text-red-400' : 'text-amber-400'}`}>
                {score}<span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Quantity</div>
              <div className="text-base font-bold text-slate-900">{shipment.quantity_tonnes} <span className="text-xs text-slate-500 font-normal">tonnes</span></div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Destination Stock</div>
              <div className={`text-base font-bold ${shipment.destination_inventory_hours <= 10 ? 'text-red-600' : 'text-slate-900'}`}>
                {shipment.destination_inventory_hours} hours
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">ETA Delay</div>
              <div className={`text-base font-bold ${shipment.delay_minutes > 60 ? 'text-amber-700' : 'text-slate-900'}`}>
                +{delayText}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Current Location</div>
              <div className="text-xs font-bold text-slate-900 truncate">{shipment.current_location}</div>
            </div>
          </div>

          {/* Critical Priority Explanation Box */}
          <div className={`p-4 rounded-lg border ${isCritical ? 'bg-red-50/70 border-red-200' : 'bg-blue-50/70 border-blue-200'}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={`h-5 w-5 ${isCritical ? 'text-red-600' : 'text-blue-600'} shrink-0 mt-0.5`} />
              <div>
                <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isCritical ? 'text-red-900' : 'text-blue-900'}`}>
                  AI Priority Engine Score: {score}/100 ({shipment.priority.classification})
                </h4>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {shipment.priority.explanation_text}
                </p>

                {/* Score Factor Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 pt-3 border-t border-slate-200/60 text-center">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold">Inventory (30%)</div>
                    <div className="text-xs font-extrabold text-red-600">{shipment.priority.breakdown.inventory_urgency_pts} pts</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold">ETA Delay (25%)</div>
                    <div className="text-xs font-extrabold text-amber-600">{shipment.priority.breakdown.eta_delay_pts} pts</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold">Quantity (20%)</div>
                    <div className="text-xs font-extrabold text-slate-800">{shipment.priority.breakdown.quantity_pts} pts</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold">Congestion (15%)</div>
                    <div className="text-xs font-extrabold text-slate-800">{shipment.priority.breakdown.congestion_pts} pts</div>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold">Criticality (10%)</div>
                    <div className="text-xs font-extrabold text-slate-800">{shipment.priority.breakdown.criticality_pts} pts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Digital Coal Trail Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Verified Digital Coal Trail
              </h4>
              <button
                onClick={() => {
                  onClose();
                  onOpenCCTV();
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 transition"
              >
                <Camera className="h-3.5 w-3.5" />
                View Checkpoint CCTV Feed
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 space-y-4 border-l-2 border-slate-200">
              {shipment.events.map((ev, idx) => (
                <div key={ev.id} className="relative group">
                  
                  {/* Timeline node icon */}
                  <div className={`absolute -left-[31px] top-0.5 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    ev.verified
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                      : 'bg-slate-300 text-slate-700'
                  }`}>
                    {ev.verified ? <CheckCircle2 className="h-3.5 w-3.5" /> : (idx + 1)}
                  </div>

                  {/* Timeline Card */}
                  <div className={`p-3.5 rounded-lg border ${
                    ev.source === 'CCTV'
                      ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-200/50'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{ev.event_type}</span>
                        {ev.verified && (
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" /> PHYSICALLY VERIFIED
                          </span>
                        )}
                        <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded font-mono">
                          SOURCE: {ev.source}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500">{ev.timestamp}</span>
                    </div>

                    <div className="text-xs text-slate-700 mt-1 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{ev.location}</span>
                    </div>

                    {ev.verification_details && (
                      <p className="text-xs text-slate-600 mt-1.5 pt-1.5 border-t border-slate-100 font-mono bg-white/70 p-1.5 rounded">
                        {ev.verification_details}
                      </p>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Vehicle: <strong className="text-slate-800">{shipment.vehicle_id || 'OD-14-B-1840'}</strong> • Driver: <strong className="text-slate-800">{shipment.driver_name || 'Rajesh Kumar'}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-4 py-2 rounded-md transition"
            >
              Close Window
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
