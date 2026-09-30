import React from 'react';
import { Shipment } from '../types';
import { ShieldCheck, AlertCircle, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

interface PriorityQueueProps {
  shipments: Shipment[];
  onSelectShipment: (shipment: Shipment) => void;
}

export const PriorityQueue: React.FC<PriorityQueueProps> = ({
  shipments,
  onSelectShipment,
}) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-red-600" />
            AI Shipment Priority Queue (Explainable Scoring 0–100)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked dynamically by Destination Inventory Urgency (30%), Delay (25%), Tonnage (20%), Congestion (15%), Criticality (10%).
          </p>
        </div>
        <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded">
          {shipments.length} Active Consignments
        </span>
      </div>

      {/* List of Shipments */}
      <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
        {shipments.map((shipment, index) => {
          const isHero = shipment.id === 'CS-184';
          const score = shipment.priority.score;
          const isCritical = score >= 81;
          const isHigh = score >= 61 && score < 81;
          const isMedium = score >= 31 && score < 61;

          let badgeClass = 'badge-normal';
          if (isCritical) badgeClass = 'badge-critical';
          else if (isHigh) badgeClass = 'badge-high';
          else if (isMedium) badgeClass = 'badge-medium';

          const delayHrs = Math.floor(shipment.delay_minutes / 60);
          const delayMins = shipment.delay_minutes % 60;
          const delayText = shipment.delay_minutes > 0 ? `${delayHrs}h ${delayMins}m delay` : 'On time';

          return (
            <div
              key={shipment.id}
              onClick={() => onSelectShipment(shipment)}
              className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isHero ? 'bg-red-50/40 border-l-4 border-l-red-600' : ''
              }`}
            >
              {/* Left Column: ID, Origin, Destination, Badges */}
              <div className="flex items-start gap-3">
                <div className="text-xs font-extrabold text-slate-400 w-6 pt-0.5">
                  #{index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{shipment.id}</span>
                    {isHero && (
                      <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wide animate-pulse">
                        HERO DEMO
                      </span>
                    )}
                    <span className={badgeClass}>
                      {score}/100 • {shipment.priority.classification}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>From: <strong className="text-slate-800">{shipment.origin}</strong></span>
                    <span>→</span>
                    <span>To: <strong className="text-slate-800">{shipment.destination}</strong></span>
                    <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold">
                      {shipment.transport_mode}
                    </span>
                  </div>

                  {/* Factor Pill Breakdown */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Plant Stock: <strong className={shipment.destination_inventory_hours <= 10 ? 'text-red-600' : 'text-slate-800'}>{shipment.destination_inventory_hours}h</strong>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Delay: <strong className={shipment.delay_minutes > 60 ? 'text-amber-700' : 'text-slate-800'}>{delayText}</strong>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Qty: <strong className="text-slate-800">{shipment.quantity_tonnes} tonnes</strong>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Congestion: <strong className="text-slate-800">{shipment.congestion_level}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Status & Inspect Action */}
              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0">
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-1 sm:justify-end">
                    {shipment.status === 'CHECKPOINT_VERIFIED' ? (
                      <span className="text-emerald-600 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" /> CCTV Verified
                      </span>
                    ) : (
                      <span className="text-slate-600 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {shipment.status.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Vehicle: {shipment.vehicle_id || 'N/A'}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectShipment(shipment);
                  }}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 transition shadow-2xs"
                >
                  Inspect Trail
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
