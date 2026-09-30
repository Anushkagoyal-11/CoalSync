import React, { useState } from 'react';
import { CCTVFrameDetection, Shipment } from '../types';
import { Camera, ShieldCheck, CheckCircle2, RefreshCw, Eye, Train, Check } from 'lucide-react';

interface CCTVViewProps {
  cctvData: CCTVFrameDetection;
  heroShipment: Shipment;
  onInspectShipment: (shipment: Shipment) => void;
}

export const CCTVView: React.FC<CCTVViewProps> = ({
  cctvData,
  heroShipment,
  onInspectShipment,
}) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const expectedTrain = cctvData.expected_train_number || "12834";
  const detectedTrain = cctvData.detected_train_number || "12834";
  const isMatch = expectedTrain === detectedTrain;

  const handleTriggerReVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 750);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-xs p-4 sm:p-5">
      
      {/* Railway CCTV Metadata Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <Train className="h-5 w-5 text-blue-700" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Railway CCTV Shipment Verification
            </h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              CCTV STATUS: ONLINE
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono mt-1">
            <span>Camera ID: <strong className="text-slate-800 font-bold">RAIL-CP-01</strong></span>
            <span>•</span>
            <span>Location: <strong className="text-slate-800 font-bold">Talcher Rail Checkpoint</strong></span>
            <span>•</span>
            <span>Timestamp: <strong className="text-slate-700">{cctvData.timestamp}</strong></span>
          </div>
        </div>

        <button
          onClick={handleTriggerReVerification}
          disabled={isVerifying}
          className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3.5 py-2 rounded flex items-center gap-1.5 transition disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
          {isVerifying ? 'Scanning Railway Rake...' : 'Simulate Rake Checkpoint Pass'}
        </button>
      </div>

      {/* Main Grid: Railway CCTV Footage Area Left, Match Verification Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Railway CCTV Optical Footage Area (2 Columns) */}
        <div className="lg:col-span-2 relative bg-slate-950 rounded-lg overflow-hidden aspect-video border-2 border-slate-800 shadow-xl flex flex-col justify-between p-3.5">
          
          {/* Railway Tracks & Freight Rake Visual Canvas Simulation */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
            
            {/* Parallel Rail Tracks Graphic Lines */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 border-y-2 border-slate-700 bg-slate-950/60 flex items-center justify-around">
              <div className="w-full h-full opacity-30 bg-[linear-gradient(90deg,#94a3b8_2px,transparent_2px)] [background-size:24px_100%]"></div>
            </div>

            {/* Passing Train Boxcar / Freight Rake Representation */}
            <div className="relative w-[85%] h-44 border-2 border-emerald-400 bg-emerald-950/40 rounded flex flex-col justify-between p-3.5 shadow-2xl transition-all">
              
              {/* Top OCR Bounding Box Indicator */}
              <div className="bg-emerald-600 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded w-max flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="h-3.5 w-3.5" />
                TRAIN DETECTED: {detectedTrain} (Confidence: {(cctvData.confidence * 100).toFixed(1)}%)
              </div>

              {/* Rake Details Center */}
              <div className="text-center font-mono my-auto">
                <div className="text-2xl font-black text-emerald-400 tracking-wider">
                  TRAIN {detectedTrain}
                </div>
                <div className="text-xs text-emerald-200 mt-0.5">
                  SECR Coal Rake • 59 BOXN-HA Wagons
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Optical OCR Camera Stream • Node RAIL-CP-01
                </div>
              </div>

              {/* Bottom Corners Info */}
              <div className="flex justify-between text-[10px] font-mono text-emerald-400 border-t border-emerald-500/30 pt-1">
                <span>Checkpoint: Talcher Rail Siding</span>
                <span>Speed: 24 km/h</span>
              </div>
            </div>

            {/* Camera Scan Radar Line */}
            <div className="absolute inset-x-0 h-0.5 bg-amber-400 opacity-80 animate-radar"></div>
          </div>

          {/* Top HUD Metadata Overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-slate-900/90 text-white text-[11px] px-2.5 py-1 rounded border border-slate-700 flex items-center gap-2 font-mono">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              LIVE FEED • RAIL-CP-01 • TALCHER SIDING
            </div>
            <div className="bg-slate-900/90 text-slate-300 text-[11px] px-2.5 py-1 rounded border border-slate-700 font-mono">
              {cctvData.timestamp}
            </div>
          </div>

          {/* Bottom HUD Match Status Overlay */}
          <div className="relative z-10 bg-slate-900/95 p-2.5 rounded border border-slate-800 text-white flex items-center justify-between font-mono">
            <div>
              <div className="text-xs font-bold text-slate-200">
                DETECTED TRAIN: <span className="text-emerald-400 font-black">{detectedTrain}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                OCR Confidence: {(cctvData.confidence * 100).toFixed(1)}% • Match Status: OK
              </div>
            </div>
            <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded">
              MATCH VERIFIED
            </span>
          </div>

        </div>

        {/* Verification Logic & Linked Consignment Panel (1 Column) */}
        <div className="space-y-4">
          
          {/* Comparison Card */}
          <div className="bg-slate-50 rounded border border-slate-300 p-3.5 space-y-3 font-mono">
            <div className="text-xs font-bold text-slate-900 uppercase border-b border-slate-200 pb-2">
              Train Number Verification Logic
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-500">Expected Train:</span>
                <span className="font-bold text-slate-900 text-sm">{expectedTrain}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-500">Detected Train:</span>
                <span className="font-bold text-emerald-700 text-sm">{detectedTrain}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-500">Consignment:</span>
                <span className="font-extrabold text-blue-700 text-sm">CS-184</span>
              </div>
            </div>

            {/* Match Verified Prominent Display */}
            {isMatch && (
              <div className="bg-emerald-50 border-2 border-emerald-500 p-3 rounded text-center space-y-1">
                <div className="text-emerald-800 font-black text-sm flex items-center justify-center gap-1.5 uppercase">
                  <Check className="h-4 w-4 text-emerald-700 stroke-[3]" />
                  ✓ SHIPMENT VERIFIED
                </div>
                <p className="text-xs font-sans text-emerald-900 font-semibold leading-snug">
                  "CS-184 physically verified at Rail Checkpoint CP-01"
                </p>
              </div>
            )}
          </div>

          {/* Consignment Quick Details */}
          <div className="bg-slate-50 p-3.5 rounded border border-slate-300 space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Hero Consignment:</span>
              <strong className="text-blue-700">CS-184</strong>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Origin / Dest:</span>
              <span className="text-slate-800 font-sans truncate">Mine A &rarr; Plant B</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-slate-500">Transport Mode:</span>
              <span className="text-slate-800 uppercase font-bold">MULTIMODAL (RAIL)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Camera Source:</span>
              <span className="bg-white px-1.5 py-0.5 rounded border text-[10px] text-slate-700">RAIL-CP-01</span>
            </div>
          </div>

          {/* Direct Action Button */}
          <button
            onClick={() => onInspectShipment(heroShipment)}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2.5 px-4 rounded flex items-center justify-center gap-2 transition"
          >
            <Eye className="h-4 w-4" />
            Inspect CS-184 Digital Coal Trail
          </button>

          {/* Prototype Architecture Disclaimer Note */}
          <p className="text-[10px] text-slate-400 italic font-mono text-center">
            * Simulated optical train-number detection. Modular architecture designed for plug-and-play integration with railway siding CCTV video streams.
          </p>

        </div>

      </div>

    </div>
  );
};
