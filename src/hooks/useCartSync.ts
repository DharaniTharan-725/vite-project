
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/types/cart";
import { Product } from "@/data/products";
import { toast } from "sonner";

export function useCartSync(user: any | null, setCartItems: (items: CartItem[]) => void) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Load cart items when user changes
  useEffect(() => {
    async function loadCartItems() {
      setIsLoading(true);
      
      try {
        if (user) {
          // Load from Supabase if user is logged in
          const { data: cartData, error } = await supabase
            .from('cart_items')
            .select('*, product_id')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          if (cartData && cartData.length > 0) {
            // Fetch product details for each cart item
            const productIds = cartData.map(item => item.product_id);
            
            const { data: productsData, error: productsError } = await supabase
              .from('products')
              .select('*')
              .in('id', productIds);
              
            if (productsError) {
              throw productsError;
            }

            if (productsData) {
              const cartItemsWithProducts = cartData.map(cartItem => {
                const product = productsData.find(p => p.id === cartItem.product_id);
                return {
                  product: product as unknown as Product,
                  quantity: cartItem.quantity
                };
              });
              
              setCartItems(cartItemsWithProducts);
            }
          } else {
            setCartItems([]);
          }
        } else {
          // Load from localStorage if user is not logged in
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        }
      } catch (error: any) {
        console.error("Error loading cart:", error);
        toast.error("Failed to load your cart");
      } finally {
        setIsLoading(false);
      }
    }

    loadCartItems();
  }, [user, setCartItems]);
  
  return { isLoading };
}
