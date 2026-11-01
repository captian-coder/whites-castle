import type { Product } from "@/lib/types";
import type { CartItemOptions } from "./cart.types";

export const dummyStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};

export function makeCartKey(product: Product, variant?: CartItemOptions) {
  if (!variant) return product.id;
  const instructionsKey = variant.instructions?.trim() ? `:${variant.instructions.trim()}` : "";
  return `${product.id}:${variant.label}${instructionsKey}`;
}