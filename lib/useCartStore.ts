import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartState, CartProduct } from "./cart.types";
import { dummyStorage, makeCartKey } from "./cart.utils";

let toastTimeout: NodeJS.Timeout;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      selectedLocation: null,
      isCartOpen: false,
      isLocationModalOpen: false,
      toast: null,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      openLocationModal: () => set({ isLocationModalOpen: true }),
      closeLocationModal: () => set({ isLocationModalOpen: false }),

      showToast: (msg: string) => {
        if (toastTimeout) clearTimeout(toastTimeout);
        set({ toast: msg });
        toastTimeout = setTimeout(() => { set({ toast: null }); }, 2000);
      },

      clearToast: () => set({ toast: null }),

      setLocation: (location) => {
        set({ selectedLocation: location });
        get().showToast(`Ordering from ${location.branchName}`);
      },

      addItem: (product, variant) => {
        const key = makeCartKey(product, variant);
        const state = get();
        const existing = state.cart.find((line) => line.key === key);

        if (existing) {
          set({ cart: state.cart.map((l) => l.key === key ? { ...l, quantity: l.quantity + 1 } : l) });
        } else {
          const productForCart: CartProduct = {
            ...product,
            cartKey: key,
            price: variant?.price ?? product.price,
            variantLabel: variant?.label,
            instructions: variant?.instructions?.trim() || undefined,
          };
          set({ cart: [...state.cart, { key, product: productForCart, quantity: 1 }] });
        }
        get().showToast(`${product.name} added to cart`);
      },

      incrementItem: (key) => set((state) => ({ cart: state.cart.map((l) => l.key === key ? { ...l, quantity: l.quantity + 1 } : l) })),
      
      removeItem: (key) => set((state) => ({
        cart: state.cart.flatMap((l) => {
          if (l.key !== key) return l;
          return l.quantity > 1 ? { ...l, quantity: l.quantity - 1 } : [];
        }),
      })),

      deleteItem: (key) => set((state) => ({ cart: state.cart.filter((l) => l.key !== key) })),

      clearCart: () => {
        set({ cart: [], isCartOpen: false });
        get().showToast("Cart cleared");
      },
    }),
    {
      name: "whites_castle_cart_storage",
      storage: createJSONStorage(() => typeof window !== "undefined" ? localStorage : dummyStorage),
      partialize: (state) => ({
        cart: state.cart,
        selectedLocation: state.selectedLocation,
      }),
    }
  )
);