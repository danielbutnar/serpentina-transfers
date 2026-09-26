import type { AirportCode, DestinationId } from "./fares";

// A simplified map of central Romania for the route drawings. Positions are real longitude and
// latitude, projected flat (longitude scaled by cos 45.6°). Routes follow the main roads through
// named towns, not the exact road geometry.

type Node = { lon: number; lat: number };

export const NODES = {
  OTP: { lon: 26.085, lat: 44.571 },
  GHV: { lon: 25.525, lat: 45.705 },
  SBZ: { lon: 24.091, lat: 45.786 },
  CLJ: { lon: 23.686, lat: 46.785 },
  brasov: { lon: 25.589, lat: 45.657 },
  poiana: { lon: 25.552, lat: 45.594 },
  bran: { lon: 25.368, lat: 45.515 },
  predeal: { lon: 25.577, lat: 45.504 },
  sinaia: { lon: 25.551, lat: 45.35 },
  ploiesti: { lon: 26.02, lat: 44.94 },
  campina: { lon: 25.74, lat: 45.13 },
  rasnov: { lon: 25.46, lat: 45.59 },
  fagaras: { lon: 24.97, lat: 45.84 },
  targuMures: { lon: 24.56, lat: 46.54 },
  sighisoara: { lon: 24.79, lat: 46.22 },
} satisfies Record<string, Node>;

export type NodeId = keyof typeof NODES;

const OTP_SOUTH: NodeId[] = ["OTP", "ploiesti", "campina", "sinaia"];
const SBZ_EAST: NodeId[] = ["SBZ", "fagaras", "GHV", "brasov"];
const CLJ_SOUTH: NodeId[] = ["CLJ", "targuMures", "sighisoara", "brasov"];

export const ROUTES: Record<AirportCode, Record<DestinationId, NodeId[]>> = {
  OTP: {
    sinaia: OTP_SOUTH,
    predeal: [...OTP_SOUTH, "predeal"],
    brasov: [...OTP_SOUTH, "predeal", "brasov"],
    poiana: [...OTP_SOUTH, "predeal", "brasov", "poiana"],
    bran: [...OTP_SOUTH, "predeal", "rasnov", "bran"],
  },
  GHV: {
    brasov: ["GHV", "brasov"],
    poiana: ["GHV", "brasov", "poiana"],
    bran: ["GHV", "rasnov", "bran"],
    predeal: ["GHV", "brasov", "predeal"],
    sinaia: ["GHV", "brasov", "predeal", "sinaia"],
  },
  SBZ: {
    brasov: SBZ_EAST,
    poiana: [...SBZ_EAST, "poiana"],
    bran: ["SBZ", "fagaras", "rasnov", "bran"],
    predeal: [...SBZ_EAST, "predeal"],
    sinaia: [...SBZ_EAST, "predeal", "sinaia"],
  },
  CLJ: {
    brasov: CLJ_SOUTH,
    poiana: [...CLJ_SOUTH, "poiana"],
    bran: [...CLJ_SOUTH, "rasnov", "bran"],
    predeal: [...CLJ_SOUTH, "predeal"],
    sinaia: [...CLJ_SOUTH, "predeal", "sinaia"],
  },
};

// The Carpathian arc as a thick band: Southern Carpathians west to east, then north.
const MOUNTAINS: Node[] = [
  { lon: 23.2, lat: 45.42 },
  { lon: 24.0, lat: 45.55 },
  { lon: 24.7, lat: 45.57 },
  { lon: 25.2, lat: 45.42 },
  { lon: 25.55, lat: 45.42 },
  { lon: 26.0, lat: 45.62 },
  { lon: 26.05, lat: 46.1 },
  { lon: 25.75, lat: 46.6 },
  { lon: 25.5, lat: 47.1 },
];

const WEST = 23.25;
const NORTH = 46.95;
const SCALE = 88; // px per degree of latitude
const LON_SCALE = SCALE * Math.cos((45.6 * Math.PI) / 180);

export const MAP_WIDTH = Math.round((26.35 - WEST) * LON_SCALE);
export const MAP_HEIGHT = Math.round((NORTH - 44.45) * SCALE);

export function project(node: Node): { x: number; y: number } {
  return { x: Math.round((node.lon - WEST) * LON_SCALE * 10) / 10, y: Math.round((NORTH - node.lat) * SCALE * 10) / 10 };
}

export function polylinePoints(nodes: Node[]): string {
  return nodes
    .map(project)
    .map((p) => `${p.x},${p.y}`)
    .join(" ");
}

export function routePoints(from: AirportCode, to: DestinationId): string {
  return polylinePoints(ROUTES[from][to].map((id) => NODES[id]));
}

export const MOUNTAIN_POINTS = polylinePoints(MOUNTAINS);

// The part of the map a route needs: its bounding box with padding, at least ~0.5° across, widened to
// a 4:3 frame. `k` scales text and markers so they keep the same on-screen size at every zoom.
export type ViewBox = { x: number; y: number; w: number; h: number; k: number };

export function routeViewBox(from: AirportCode, to: DestinationId): ViewBox {
  const pts = ROUTES[from][to].map((id) => project(NODES[id]));
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  let w = Math.max(Math.max(...xs) - Math.min(...xs), 44);
  let h = Math.max(Math.max(...ys) - Math.min(...ys), 33);
  const pad = 0.2 * Math.max(w, h) + 12;
  w += 2 * pad;
  h += 2 * pad;
  if (w / h < 4 / 3) w = (h * 4) / 3;
  else h = (w * 3) / 4;
  return { x: cx - w / 2, y: cy - h / 2, w, h, k: w / 190 };
}

// Which side of a point to put its label: away from the neighbouring route point.
export function labelSide(point: { x: number; y: number }, neighbour: { x: number; y: number }): "left" | "right" {
  return neighbour.x > point.x ? "left" : "right";
}
