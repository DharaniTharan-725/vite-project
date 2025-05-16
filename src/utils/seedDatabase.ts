
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/data/products";

export async function seedProducts() {
  try {
    // Check if products already exist
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    if (checkError) {
      throw checkError;
    }
    
    // Only seed if no products exist
    if (!existingProducts || existingProducts.length === 0) {
      console.log("No products found, seeding database with sample data");
      
      // Create sample products
      const { error } = await supabase
        .from('products')
        .insert(products.map(product => {
          // Make sure all images are valid URLs
          if (product.name === "Wireless Bluetooth Earbuds") {
            return {
              ...product,
              image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
            };
          }
          return product;
        }));
        
      if (error) {
        throw error;
      }
      
      return { success: true, message: "Database seeded successfully" };
    } else {
      // Update any existing product with broken image
      const { data: earbuds, error: earbudsError } = await supabase
        .from('products')
        .update({ 
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
        })
        .eq('name', 'Wireless Bluetooth Earbuds')
        .select();
        
      if (earbudsError) {
        console.error("Error updating earbuds image:", earbudsError);
      } else if (earbuds && earbuds.length > 0) {
        console.log("Updated earbuds image successfully");
      }
      
      return { success: true, message: "Database already has products" };
    }
  } catch (error: any) {
    console.error("Error seeding database:", error);
    return { success: false, message: error.message };
  }
}
