import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { LocationNode, Shipment } from '../types';

interface MapViewProps {
  locations: LocationNode[];
  shipments: Shipment[];
  selectedShipmentId?: string;
  onSelectShipment: (shipment: Shipment) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  locations,
  shipments,
  selectedShipmentId,
  onSelectShipment,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize MapLibre GL map centered on Indian Coal Logistics Corridor
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors | CoalSync AI GIS Layer',
          },
        },
        layers: [
          {
            id: 'osm-tiles-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [82.5000, 22.8000], // Centered around Central/Eastern Indian coal belt
      zoom: 5.5,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Update Markers & Routes whenever locations or shipments change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Helper to add HTML Marker
    const addHtmlMarker = (lng: number, lat: number, el: HTMLElement, popupHtml: string) => {
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(popupHtml);
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
      markersRef.current.push(marker);
    };

    // Render Location Nodes
    locations.forEach((loc) => {
      const el = document.createElement('div');
      el.className = 'cursor-pointer transform hover:scale-110 transition-transform';

      let bgClass = 'bg-slate-800 text-white';
      let symbol = '📍';

      if (loc.type === 'MINE') {
        bgClass = 'bg-stone-800 text-amber-400 border-2 border-stone-600';
        symbol = '⛏️';
      } else if (loc.type === 'SIDING') {
        bgClass = 'bg-blue-600 text-white border-2 border-blue-400';
        symbol = '🚂';
      } else if (loc.type === 'CHECKPOINT') {
        bgClass = 'bg-emerald-600 text-white border-2 border-emerald-400';
        symbol = '🎥';
      } else if (loc.type === 'PORT') {
        bgClass = 'bg-cyan-700 text-white border-2 border-cyan-400';
        symbol = '⚓';
      } else if (loc.type === 'PLANT') {
        const lowInv = loc.inventory_hours && loc.inventory_hours <= 12;
        bgClass = lowInv
          ? 'bg-red-600 text-white border-2 border-red-300 animate-pulse'
          : 'bg-amber-600 text-white border-2 border-amber-300';
        symbol = '🏭';
      }

      el.innerHTML = `
        <div class="${bgClass} px-2 py-1 rounded-md text-[11px] font-bold shadow-md flex items-center gap-1">
          <span>${symbol}</span>
          <span>${loc.code}</span>
        </div>
      `;

      const popupContent = `
        <div class="p-2 font-sans">
          <div class="font-bold text-xs text-slate-900">${loc.name}</div>
          <div class="text-[11px] text-slate-600">${loc.type} • ${loc.state}</div>
          ${loc.inventory_hours ? `<div class="mt-1 text-[11px] font-semibold text-red-600">Stock Inventory: ${loc.inventory_hours} hrs</div>` : ''}
        </div>
      `;

      addHtmlMarker(loc.lng, loc.lat, el, popupContent);
    });

    // Render Shipment Markers
    shipments.forEach((shipment) => {
      const [lat, lng] = shipment.current_coords;
      const isHero = shipment.id === 'CS-184';
      const isSelected = shipment.id === selectedShipmentId;

      const el = document.createElement('div');
      el.className = 'cursor-pointer transition-transform hover:scale-125 z-20';

      const isCritical = shipment.priority.score >= 81;
      const badgeBg = isCritical ? 'bg-red-600' : (shipment.priority.score >= 61 ? 'bg-amber-500' : 'bg-blue-600');

      el.innerHTML = `
        <div class="relative flex flex-col items-center">
          ${isHero || isCritical ? '<span class="absolute -top-1 -right-1 flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span></span>' : ''}
          <div class="${badgeBg} text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-lg border-2 ${isSelected ? 'border-yellow-400 scale-110' : 'border-white'} flex items-center gap-1">
            <span>🚚</span>
            <span>${shipment.id} (${shipment.priority.score})</span>
          </div>
        </div>
      `;

      el.addEventListener('click', () => {
        onSelectShipment(shipment);
      });

      const popupContent = `
        <div class="p-2 font-sans max-w-xs">
          <div class="flex items-center justify-between gap-2 border-b pb-1 mb-1">
            <span class="font-bold text-sm text-slate-900">${shipment.id}</span>
            <span class="text-xs font-extrabold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
              Priority: ${shipment.priority.score}/100
            </span>
          </div>
          <div class="text-xs text-slate-700 font-medium">To: ${shipment.destination}</div>
          <div class="text-[11px] text-slate-500">Status: ${shipment.status.replace('_', ' ')}</div>
          <div class="text-[11px] text-amber-700 font-medium mt-0.5">Delay: ${Math.floor(shipment.delay_minutes/60)}h ${shipment.delay_minutes%60}m</div>
          <button id="btn-inspect-${shipment.id}" class="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold py-1 rounded">
            Inspect Coal Trail & Details
          </button>
        </div>
      `;

      addHtmlMarker(lng, lat, el, popupContent);
    });

    // Fly map to CS-184 if selected
    if (selectedShipmentId === 'CS-184') {
      const hero = shipments.find((s) => s.id === 'CS-184');
      if (hero && map) {
        map.flyTo({
          center: [hero.current_coords[1], hero.current_coords[0]],
          zoom: 7,
          essential: true,
        });
      }
    }
  }, [locations, shipments, selectedShipmentId, onSelectShipment]);

  return (
    <div className="relative w-full h-[460px] lg:h-[540px] rounded-lg overflow-hidden border border-slate-300 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-md border border-slate-200 shadow-xs text-xs font-semibold text-slate-800 z-10 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-blue-600"></span>
        Interactive GIS Coal Logistics Map (MapLibre GL)
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-md border border-slate-200 shadow-md text-[11px] text-slate-700 z-10 hidden sm:block">
        <div className="font-bold text-slate-900 mb-1">GIS Map Legend</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1.5">
            <span>⛏️</span> <span>Mine Dispatch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🚂</span> <span>Rail Siding</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🎥</span> <span>CCTV Checkpoint</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🏭</span> <span>Thermal Plant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-600"></span> <span>Critical (&ge;81)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span> <span>High (61-80)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
