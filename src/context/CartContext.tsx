
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { CartContextType, CartItem } from "@/types/cart";
import { useCartOperations } from "@/hooks/useCartOperations";
import { useCartSync } from "@/hooks/useCartSync";
import { useLocalCartStorage } from "@/hooks/useLocalCartStorage";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  
  const {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCartOperations(user);
  
  const { isLoading } = useCartSync(user, setCartItems);
  
  // Save cart to localStorage for non-logged in users
  useLocalCartStorage(cartItems, isLoading, user);
  
  // Calculate cart totals
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
