import type { Branch } from "../types";
import { brand } from "./brand";

export const branches: Branch[] = [
  { id: "gul-bahar", city: "Faisalabad", name: "White's Castle - Gul Bahar Colony", address: "Street #2, Gul Bahar Colony, Satiana Road, Faisalabad", phone: brand.phone, hours: brand.hours },
  { id: "eden-garden", city: "Faisalabad", name: "White's Castle - Eden Garden", address: "Eden Garden, Faisalabad", phone: brand.phone, hours: brand.hours },
  { id: "gulberg", city: "Faisalabad", name: "White's Castle - Gulberg", address: "Gulberg, Faisalabad", phone: brand.phone, hours: brand.hours },
  { id: "sargodha", city: "Sargodha", name: "White's Castle - Sargodha", address: "White's Castle, Sargodha", phone: "+92 304 111 5959", hours: brand.hours },
  { id: "samundri", city: "Samundri", name: "White's Castle - Samundri", address: "White's Castle, Samundri", phone: brand.phone, hours: brand.hours },
  { id: "gojra", city: "Gojra", name: "White's Castle - Gojra", address: "White's Castle, Gojra", phone: brand.phone, hours: brand.hours },
  { id: "sheikhupura", city: "Sheikhupura", name: "White's Castle - Sheikhupura", address: "White's Castle, Sheikhupura", phone: brand.phone, hours: brand.hours }
];

export const cities = Array.from(new Set(branches.map((branch) => branch.city)));