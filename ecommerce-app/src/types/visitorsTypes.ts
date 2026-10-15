


export interface Visitor {
  id: string;
  session_key: string;
  ip_address: string;
  device_type: "mobile" | "tablet" | "desktop";
}

export interface TrackVisitorResponse {
  visitor: Visitor;
  is_new_visit: boolean;
}
