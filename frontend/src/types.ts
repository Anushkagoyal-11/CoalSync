export type NodeType = 'MINE' | 'SIDING' | 'PORT' | 'PLANT' | 'CHECKPOINT';

export type TransportMode = 'ROAD' | 'RAIL' | 'MULTIMODAL';

export type EventSource = 'GPS' | 'CCTV' | 'RAILWAY' | 'PORT' | 'WEIGHBRIDGE' | 'SYSTEM';

export type PriorityClassification = 'NORMAL' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ShipmentStatus = 'LOADING' | 'IN_TRANSIT' | 'CHECKPOINT_VERIFIED' | 'DELAYED' | 'ARRIVED';

export interface LocationNode {
  id: string;
  name: string;
  code: string;
  type: NodeType;
  lat: number;
  lng: number;
  state: string;
  inventory_hours?: number;
  capacity_tonnes?: number;
}

export interface JourneyEvent {
  id: string;
  timestamp: string;
  location: string;
  event_type: string;
  source: EventSource;
  verified: boolean;
  verification_details?: string;
  confidence?: number;
}

export interface PriorityBreakdown {
  inventory_urgency_pts: number;
  eta_delay_pts: number;
  quantity_pts: number;
  congestion_pts: number;
  criticality_pts: number;
}

export interface PriorityExplanation {
  score: number;
  classification: PriorityClassification;
  breakdown: PriorityBreakdown;
  inventory_hours: number;
  delay_minutes: number;
  quantity_tonnes: number;
  congestion_level: string;
  criticality_level: string;
  explanation_text: string;
}

export interface Shipment {
  id: string;
  origin: string;
  origin_code: string;
  destination: string;
  destination_code: string;
  quantity_tonnes: number;
  transport_mode: TransportMode;
  current_location: string;
  current_coords: [number, number]; // [lat, lng]
  planned_eta: string;
  current_eta: string;
  delay_minutes: number;
  status: ShipmentStatus;
  destination_inventory_hours: number;
  congestion_level: string;
  delivery_criticality: string;
  priority: PriorityExplanation;
  events: JourneyEvent[];
  route_points: [number, number][];
  vehicle_id?: string;
  driver_name?: string;
  cargo_type?: string;
}

export interface CCTVFrameDetection {
  detection_id: string;
  camera_id: string;
  checkpoint_name: string;
  timestamp: string;
  vehicle_id: string;
  vehicle_type: string;
  confidence: number;
  matched_shipment_id?: string;
  expected_train_number?: string;
  detected_train_number?: string;
  verification_status: string;
  bounding_box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface SystemStats {
  total_active: number;
  in_transit: number;
  delayed: number;
  critical: number;
  verified_percentage: number;
  total_tonnage_in_transit: number;
}
