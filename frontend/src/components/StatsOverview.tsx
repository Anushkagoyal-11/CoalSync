import React from 'react';
import { SystemStats } from '../types';

interface StatsOverviewProps {
  stats: SystemStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      
      <div className="bg-white p-3 rounded border border-slate-300 shadow-xs">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Shipments</div>
        <div className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.total_active}</div>
      </div>

      <div className="bg-white p-3 rounded border border-slate-300 shadow-xs">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">In Transit</div>
        <div className="text-xl font-extrabold text-blue-700 mt-0.5">{stats.in_transit}</div>
      </div>

      <div className="bg-white p-3 rounded border border-slate-300 shadow-xs">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Delayed</div>
        <div className="text-xl font-extrabold text-amber-700 mt-0.5">{stats.delayed}</div>
      </div>

      <div className="bg-white p-3 rounded border border-slate-300 shadow-xs border-l-4 border-l-red-600">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Critical (&ge;81)</div>
        <div className="text-xl font-extrabold text-red-600 mt-0.5">{stats.critical}</div>
      </div>

      <div className="bg-white p-3 rounded border border-slate-300 shadow-xs">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CCTV Verified</div>
        <div className="text-xl font-extrabold text-emerald-700 mt-0.5">{stats.verified_percentage}%</div>
      </div>

      <div className="bg-white p-3 rounded border border-slate-300 shadow-xs">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Volume</div>
        <div className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.total_tonnage_in_transit} <span className="text-xs font-normal text-slate-500">t</span></div>
      </div>

    </div>
  );
};
