"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import { useCartStore } from "@/lib/useCartStore";
import type { OrderingContextValue, CartLine } from "@/lib/order.types";
const OrderContext = createContext<OrderingContextValue | undefined>(undefined);

export function OrderingProvider({ children }: { children: ReactNode }) {
  // Zustand Store se live state
  const cart = useCartStore((state) => state.cart);
  const selectedLocation = useCartStore((state) => state.selectedLocation);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const isLocationModalOpen = useCartStore((state) => state.isLocationModalOpen);
  const toast = useCartStore((state) => state.toast);

  // Zustand Store se actions
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const openLocationModal = useCartStore((state) => state.openLocationModal);
  const closeLocationModal = useCartStore((state) => state.closeLocationModal);
  const setLocation = useCartStore((state) => state.setLocation);
  const addItem = useCartStore((state) => state.addItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const clearCart = useCartStore((state) => state.clearCart);

  // Totals calculate karein
  const cartQuantity = useMemo(() => cart.reduce((total, line) => total + line.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, line) => total + line.product.price * line.quantity, 0), [cart]);

  const locationLabel = selectedLocation
    ? `${selectedLocation.orderType} in ${selectedLocation.city} from ${selectedLocation.branchName}`
    : "Choose city and branch";

  const value = useMemo<OrderingContextValue>(
    () => ({
      isLocationModalOpen,
      isCartOpen,
      cartOpen: isCartOpen,
      selectedLocation,
      locationLabel,
      cart: cart as CartLine[],
      cartProducts: cart as CartLine[],
      cartQuantity,
      cartTotal,
      toast,
      openLocationModal,
      closeLocationModal,
      openCart,
      closeCart,
      setLocation,
      addItem,
      incrementItem,
      removeItem,
      deleteItem,
      clearCart,
    }),
    [
      addItem, cart, cartQuantity, cartTotal, clearCart, closeCart,
      closeLocationModal, deleteItem, incrementItem, isCartOpen,
      isLocationModalOpen, locationLabel, openCart, openLocationModal,
      removeItem, selectedLocation, setLocation, toast,
    ]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderingProvider");
  }
  return context;
}