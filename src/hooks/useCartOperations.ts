
import { useState } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/types/cart";

export function useCartOperations(user: any | null) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = async (product: Product) => {
    try {
      // Check if the product ID is in the expected UUID format
      if (user) {
        console.log("Adding product to cart:", product);
        
        // Check if product already exists in the cart
        const existingItem = cartItems.find(item => item.product.id === product.id);
        const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
        
        if (existingItem) {
          // Update existing cart item in Supabase
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('user_id', user.id)
            .eq('product_id', product.id);
            
          if (error) throw error;
        } else {
          // Insert new cart item in Supabase
          const { error } = await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: product.id,
              quantity: 1
            });
            
          if (error) throw error;
        }
        
        // Update local state
        setCartItems(prevItems => {
          if (existingItem) {
            return prevItems.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevItems, { product, quantity: 1 }];
          }
        });
        
        toast.success(`Added ${product.name} to your cart`);
      } else {
        // Handle for non-logged in users (localStorage only)
        setCartItems(prevItems => {
          const existingItem = prevItems.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            toast.success(`Added another ${product.name} to your cart`);
            return prevItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            toast.success(`${product.name} added to your cart`);
            return [...prevItems, { product, quantity: 1 }];
          }
        });
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (user) {
        // Remove from Supabase
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
          
        if (error) throw error;
      }
      
      // Update local state
      setCartItems((prevItems) => {
        const itemToRemove = prevItems.find(item => item.product.id === productId);
        if (itemToRemove) {
          toast.info(`${itemToRemove.product.name} removed from cart`);
        }
        return prevItems.filter((item) => item.product.id !== productId);
      });
    } catch (error: any) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }

      if (user) {
        // Update in Supabase
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId);
          
        if (error) throw error;
      }
      
      // Update local state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error: any) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        // Clear from Supabase
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
          
        if (error) throw error;
      }
      
      // Clear local state
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error: any) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  return {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}
