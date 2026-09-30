import { LocationNode, Shipment, SystemStats, CCTVFrameDetection } from '../types';

export const INITIAL_LOCATIONS: LocationNode[] = [
  {
    id: "NODE-MINE-A",
    name: "Talcher Coalfield Mine A",
    code: "MINE-TLC",
    type: "MINE",
    lat: 20.9500,
    lng: 85.2200,
    state: "Odisha",
    capacity_tonnes: 50000
  },
  {
    id: "NODE-MINE-B",
    name: "Korba Coalfield Mine B",
    code: "MINE-KRB",
    type: "MINE",
    lat: 22.3500,
    lng: 82.6800,
    state: "Chhattisgarh",
    capacity_tonnes: 75000
  },
  {
    id: "NODE-SIDING-01",
    name: "Jharsuguda Railway Siding",
    code: "SID-JRG",
    type: "SIDING",
    lat: 21.8500,
    lng: 84.0000,
    state: "Odisha"
  },
  {
    id: "NODE-SIDING-02",
    name: "Champa Rail Siding",
    code: "SID-CHP",
    type: "SIDING",
    lat: 22.0400,
    lng: 82.6500,
    state: "Chhattisgarh"
  },
  {
    id: "NODE-CP-01",
    name: "Mahanadi Checkpoint CP-01",
    code: "CP-01",
    type: "CHECKPOINT",
    lat: 21.4000,
    lng: 84.5000,
    state: "Odisha"
  },
  {
    id: "NODE-CP-02",
    name: "Korba Checkpoint CP-02",
    code: "CP-02",
    type: "CHECKPOINT",
    lat: 22.2000,
    lng: 83.1000,
    state: "Chhattisgarh"
  },
  {
    id: "NODE-PORT-01",
    name: "Paradip Coal Port Terminal",
    code: "PRT-PDP",
    type: "PORT",
    lat: 20.2600,
    lng: 86.6700,
    state: "Odisha"
  },
  {
    id: "NODE-PLANT-B",
    name: "NTPC Dadri Thermal Power Plant",
    code: "PLT-DDR",
    type: "PLANT",
    lat: 28.5500,
    lng: 77.6000,
    state: "Uttar Pradesh",
    inventory_hours: 8.0
  },
  {
    id: "NODE-PLANT-A",
    name: "NTPC Ramagundam Super Thermal Station",
    code: "PLT-RMG",
    type: "PLANT",
    lat: 18.7600,
    lng: 79.4500,
    state: "Telangana",
    inventory_hours: 36.0
  },
  {
    id: "NODE-PLANT-C",
    name: "Vindhyachal Super Thermal Power Station",
    code: "PLT-VND",
    type: "PLANT",
    lat: 24.1000,
    lng: 82.6700,
    state: "Madhya Pradesh",
    inventory_hours: 18.0
  }
];

export const HERO_SHIPMENT_CS184: Shipment = {
  id: "CS-184",
  origin: "Talcher Coalfield Mine A",
  origin_code: "MINE-TLC",
  destination: "NTPC Dadri Thermal Power Plant",
  destination_code: "PLT-DDR",
  quantity_tonnes: 32.0,
  transport_mode: "MULTIMODAL",
  current_location: "Mahanadi Checkpoint CP-01",
  current_coords: [21.4000, 84.5000],
  planned_eta: "2026-08-16 14:00",
  current_eta: "2026-08-16 16:18",
  delay_minutes: 138,
  status: "CHECKPOINT_VERIFIED",
  destination_inventory_hours: 8.0,
  congestion_level: "HIGH",
  delivery_criticality: "VITAL",
  vehicle_id: "OD-14-B-1840",
  driver_name: "Rajesh Kumar",
  cargo_type: "Non-Coking Coal Grade G10",
  priority: {
    score: 91,
    classification: "CRITICAL",
    breakdown: {
      inventory_urgency_pts: 26.0,
      eta_delay_pts: 19.5,
      quantity_pts: 16.5,
      congestion_pts: 15.0,
      criticality_pts: 10.0
    },
    inventory_hours: 8.0,
    delay_minutes: 138,
    quantity_tonnes: 32.0,
    congestion_level: "HIGH",
    criticality_level: "VITAL",
    explanation_text: "Priority Score: 91/100 (CRITICAL). Contributing Factors: Destination Inventory 8.0h (26.0 pts), ETA Delay 2h 18m (19.5 pts), Quantity 32.0t (16.5 pts), Network Congestion HIGH (15.0 pts), Delivery Criticality VITAL (10.0 pts)."
  },
  route_points: [
    [20.9500, 85.2200],
    [21.1500, 84.9000],
    [21.4000, 84.5000],
    [21.8500, 84.0000],
    [24.1000, 82.6700],
    [28.5500, 77.6000]
  ],
  events: [
    {
      id: "EV-184-1",
      timestamp: "2026-08-16 06:00:00",
      location: "Talcher Mine A Loading Bay",
      event_type:"Consignment Dispatched",
      source: "GPS",
      verified: true,
      verification_details: "GPS Telematics Lock Engaged"
    },
    {
      id: "EV-184-2",
      timestamp: "2026-08-16 07:15:00",
      location: "Weighbridge WB-04 (Talcher)",
      event_type: "Gross Weight Recorded",
      source: "WEIGHBRIDGE",
      verified: true,
      verification_details: "Tare Weight: 12.2t, Gross: 44.2t, Net Coal: 32.0t"
    },
    {
      id: "EV-184-3",
      timestamp: "2026-08-16 10:45:00",
      location: "Mahanadi Checkpoint CP-01",
      event_type: "Road Checkpoint CCTV Verification",
      source: "CCTV",
      verified: true,
      confidence: 0.94,
      verification_details: "CCTV AI Model detected Truck OD-14-B-1840 (Confidence 94%). Physical check matched manifest CS-184."
    },
    {
      id: "EV-184-3R",
      timestamp: "2026-08-16 11:15:00",
      location: "Talcher Rail Checkpoint (RAIL-CP-01)",
      event_type: "Railway CCTV Physical Verification",
      source: "CCTV",
      verified: true,
      confidence: 0.964,
      verification_details: "✓ SHIPMENT VERIFIED: Detected Train 12834 matched Expected Train 12834 for Consignment CS-184 at Rail Checkpoint CP-01 (Confidence 96.4%)."
    },
    {
      id: "EV-184-4",
      timestamp: "2026-08-16 11:30:00",
      location: "Jharsuguda Railway Siding",
      event_type: "Arrived at Rail Siding",
      source: "RAILWAY",
      verified: false,
      verification_details: "Queued for Rake Loading (Line Congestion Delay +2h 18m)"
    },
    {
      id: "EV-184-5",
      timestamp: "2026-08-16 16:18:00 (Est)",
      location: "NTPC Dadri Power Plant",
      event_type: "Final Rake Discharge",
      source: "SYSTEM",
      verified: false,
      verification_details: "Scheduled Plant Arrival"
    }
  ]
};

export const INITIAL_SHIPMENTS: Shipment[] = [
  HERO_SHIPMENT_CS184,
  {
    id: "CS-170",
    origin: "Korba Mine B",
    origin_code: "MINE-KRB",
    destination: "NTPC Dadri Plant",
    destination_code: "PLT-DDR",
    quantity_tonnes: 31.0,
    transport_mode: "ROAD",
    current_location: "Transit En Route to NTPC Dadri",
    current_coords: [25.0000, 80.0000],
    planned_eta: "2026-08-16 12:00",
    current_eta: "2026-08-16 14:40",
    delay_minutes: 160,
    status: "DELAYED",
    destination_inventory_hours: 7.5,
    congestion_level: "HIGH",
    delivery_criticality: "VITAL",
    vehicle_id: "CG-12-C-9921",
    driver_name: "Amit Patel",
    cargo_type: "Power Grade Coal",
    priority: {
      score: 88,
      classification: "CRITICAL",
      breakdown: {
        inventory_urgency_pts: 26.5,
        eta_delay_pts: 21.0,
        quantity_pts: 15.5,
        congestion_pts: 15.0,
        criticality_pts: 10.0
      },
      inventory_hours: 7.5,
      delay_minutes: 160,
      quantity_tonnes: 31.0,
      congestion_level: "HIGH",
      criticality_level: "VITAL",
      explanation_text: "Priority Score: 88/100 (CRITICAL). Contributing Factors: Low Destination Stock 7.5h, 2h 40m delay."
    },
    route_points: [[22.3500, 82.6800], [25.0000, 80.0000], [28.5500, 77.6000]],
    events: [
      {
        id: "EV-170-1",
        timestamp: "2026-08-16 04:00:00",
        location: "Korba Mine B",
        event_type: "Dispatched",
        source: "GPS",
        verified: true
      }
    ]
  },
  {
    id: "CS-120",
    origin: "Talcher Mine A",
    origin_code: "MINE-TLC",
    destination: "NTPC Dadri Plant",
    destination_code: "PLT-DDR",
    quantity_tonnes: 40.0,
    transport_mode: "RAIL",
    current_location: "Katni Junction Rail Corridor",
    current_coords: [24.0000, 81.5000],
    planned_eta: "2026-08-16 13:00",
    current_eta: "2026-08-16 15:00",
    delay_minutes: 120,
    status: "DELAYED",
    destination_inventory_hours: 10.0,
    congestion_level: "HIGH",
    delivery_criticality: "VITAL",
    vehicle_id: "RAKE-SECR-402",
    driver_name: "Rail Loco Pilot",
    priority: {
      score: 82,
      classification: "CRITICAL",
      breakdown: {
        inventory_urgency_pts: 24.0,
        eta_delay_pts: 17.0,
        quantity_pts: 20.0,
        congestion_pts: 12.0,
        criticality_pts: 9.0
      },
      inventory_hours: 10.0,
      delay_minutes: 120,
      quantity_tonnes: 40.0,
      congestion_level: "HIGH",
      criticality_level: "VITAL",
      explanation_text: "Priority Score: 82/100 (CRITICAL). Contributing Factors: High volume rake, 2h delay to low inventory plant."
    },
    route_points: [[20.9500, 85.2200], [24.0000, 81.5000], [28.5500, 77.6000]],
    events: [
      {
        id: "EV-120-1",
        timestamp: "2026-08-16 02:00:00",
        location: "Talcher Siding",
        event_type: "Rail Dispatch",
        source: "RAILWAY",
        verified: true
      }
    ]
  },
  {
    id: "CS-112",
    origin: "Korba Mine B",
    origin_code: "MINE-KRB",
    destination: "Vindhyachal Power Station",
    destination_code: "PLT-VND",
    quantity_tonnes: 35.0,
    transport_mode: "MULTIMODAL",
    current_location: "Korba Checkpoint CP-02",
    current_coords: [22.2000, 83.1000],
    planned_eta: "2026-08-16 11:00",
    current_eta: "2026-08-16 12:15",
    delay_minutes: 75,
    status: "CHECKPOINT_VERIFIED",
    destination_inventory_hours: 14.0,
    congestion_level: "HIGH",
    delivery_criticality: "HIGH",
    priority: {
      score: 72,
      classification: "HIGH",
      breakdown: {
        inventory_urgency_pts: 18.0,
        eta_delay_pts: 12.0,
        quantity_pts: 18.0,
        congestion_pts: 15.0,
        criticality_pts: 9.0
      },
      inventory_hours: 14.0,
      delay_minutes: 75,
      quantity_tonnes: 35.0,
      congestion_level: "HIGH",
      criticality_level: "HIGH",
      explanation_text: "Priority Score: 72/100 (HIGH). Contributing Factors: Congested corridor, 75m delay."
    },
    route_points: [[22.3500, 82.6800], [22.2000, 83.1000], [24.1000, 82.6700]],
    events: [
      {
        id: "EV-112-1",
        timestamp: "2026-08-16 07:00:00",
        location: "Korba CP-02",
        event_type: "CCTV Checkpoint Passed",
        source: "CCTV",
        verified: true
      }
    ]
  },
  {
    id: "CS-105",
    origin: "Talcher Mine A",
    origin_code: "MINE-TLC",
    destination: "Paradip Coal Port Terminal",
    destination_code: "PRT-PDP",
    quantity_tonnes: 38.5,
    transport_mode: "ROAD",
    current_location: "Cuttack Highway Corridor",
    current_coords: [20.6000, 86.0000],
    planned_eta: "2026-08-16 15:00",
    current_eta: "2026-08-16 15:15",
    delay_minutes: 15,
    status: "IN_TRANSIT",
    destination_inventory_hours: 32.0,
    congestion_level: "MEDIUM",
    delivery_criticality: "NORMAL",
    priority: {
      score: 42,
      classification: "MEDIUM",
      breakdown: {
        inventory_urgency_pts: 5.0,
        eta_delay_pts: 3.0,
        quantity_pts: 19.0,
        congestion_pts: 10.0,
        criticality_pts: 5.0
      },
      inventory_hours: 32.0,
      delay_minutes: 15,
      quantity_tonnes: 38.5,
      congestion_level: "MEDIUM",
      criticality_level: "NORMAL",
      explanation_text: "Priority Score: 42/100 (MEDIUM). Normal port transport schedule."
    },
    route_points: [[20.9500, 85.2200], [20.6000, 86.0000], [20.2600, 86.6700]],
    events: []
  },
  {
    id: "CS-102",
    origin: "Korba Mine B",
    origin_code: "MINE-KRB",
    destination: "NTPC Ramagundam",
    destination_code: "PLT-RMG",
    quantity_tonnes: 42.0,
    transport_mode: "RAIL",
    current_location: "Bilaspur Rail Yard",
    current_coords: [22.3500, 82.6800],
    planned_eta: "2026-08-16 18:00",
    current_eta: "2026-08-16 18:00",
    delay_minutes: 0,
    status: "IN_TRANSIT",
    destination_inventory_hours: 48.0,
    congestion_level: "LOW",
    delivery_criticality: "NORMAL",
    priority: {
      score: 24,
      classification: "NORMAL",
      breakdown: {
        inventory_urgency_pts: 2.0,
        eta_delay_pts: 0.0,
        quantity_pts: 17.0,
        congestion_pts: 3.0,
        criticality_pts: 2.0
      },
      inventory_hours: 48.0,
      delay_minutes: 0,
      quantity_tonnes: 42.0,
      congestion_level: "LOW",
      criticality_level: "NORMAL",
      explanation_text: "Priority Score: 24/100 (NORMAL). On-time rail consignment to plant with ample 48h inventory."
    },
    route_points: [[22.3500, 82.6800], [18.7600, 79.4500]],
    events: []
  }
];

export const INITIAL_STATS: SystemStats = {
  total_active: 16,
  in_transit: 14,
  delayed: 5,
  critical: 3,
  verified_percentage: 87.5,
  total_tonnage_in_transit: 582.5
};

export const INITIAL_CCTV: CCTVFrameDetection = {
  detection_id: "DET-RAIL-2026-12834",
  camera_id: "RAIL-CP-01",
  checkpoint_name: "Talcher Rail Checkpoint",
  timestamp: "2026-08-16 11:15:00",
  vehicle_id: "Train 12834 (SECR Coal Rake)",
  vehicle_type: "Freight Rake (BOXN-HA Coal Rake)",
  confidence: 0.964,
  matched_shipment_id: "CS-184",
  expected_train_number: "12834",
  detected_train_number: "12834",
  verification_status: "VERIFIED",
  bounding_box: {
    x: 18.0,
    y: 25.0,
    width: 64.0,
    height: 50.0
  }
};
