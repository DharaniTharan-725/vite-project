
import { useEffect } from "react";
import { CartItem } from "@/types/cart";

export function useLocalCartStorage(
  cartItems: CartItem[], 
  isLoading: boolean,
  user: any | null
) {
  // Save cart to localStorage when it changes (for non-logged in users)
  useEffect(() => {
    if (!isLoading && !user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading, user]);
}
