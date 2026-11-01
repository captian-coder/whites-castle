export * from "./data/brand";
export * from "./data/categories";
export * from "./data/products";
export * from "./data/branches";
export * from "./data/offers";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  })
    .format(value)
    .replace("PKR", "Rs.");
}