import type { LocationChoice, Product } from "@/lib/types";

export type ProductVariant = NonNullable<Product["variants"]>[number];

export type CartItemOptions = ProductVariant & {
  instructions?: string;
};

export type SelectedLocation = LocationChoice & {
  branchName: string;
};

export type CartProduct = Product & {
  cartKey: string;
  variantLabel?: string;
  instructions?: string;
};

export type CartLine = {
  key: string;
  product: CartProduct;
  quantity: number;
};

export type CartState = {
  cart: CartLine[];
  selectedLocation: SelectedLocation | null;
  isCartOpen: boolean;
  isLocationModalOpen: boolean;
  toast: string | null;

  openCart: () => void;
  closeCart: () => void;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  setLocation: (location: SelectedLocation) => void;
  addItem: (product: Product, variant?: CartItemOptions) => void;
  incrementItem: (key: string) => void;
  removeItem: (key: string) => void;
  deleteItem: (key: string) => void;
  clearCart: () => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
};