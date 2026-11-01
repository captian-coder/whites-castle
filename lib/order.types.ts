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

export type OrderingContextValue = {
  isLocationModalOpen: boolean;
  isCartOpen: boolean;
  cartOpen: boolean;
  selectedLocation: SelectedLocation | null;
  locationLabel: string;
  cart: CartLine[];
  cartProducts: CartLine[];
  cartQuantity: number;
  cartTotal: number;
  toast: string | null;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  openCart: () => void;
  closeCart: () => void;
  setLocation: (location: SelectedLocation) => void;
  addItem: (product: Product, variant?: CartItemOptions) => void;
  incrementItem: (key: string) => void;
  removeItem: (key: string) => void;
  deleteItem: (key: string) => void;
  clearCart: () => void;
};