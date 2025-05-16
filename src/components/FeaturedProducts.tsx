
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Product } from "@/data/products";
import { toast } from "sonner";

export default function FeaturedProducts() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true);
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setFeaturedProducts(data as Product[]);
        }
      } catch (error) {
        console.error("Error loading featured products:", error);
        toast.error("Failed to load featured products");
        
        // Fallback to local data if needed
        const { products } = await import("@/data/products");
        setFeaturedProducts(products.filter(product => product.featured));
      } finally {
        setIsLoading(false);
      }
    }
    
    loadFeaturedProducts();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainer.current) return;
    
    const { current } = scrollContainer;
    const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2;
    
    current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
          </div>
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-amazon-blue" />
            <span className="ml-2">Loading featured products...</span>
          </div>
        </div>
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <div className="relative py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("left")}
              className="rounded-full"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("right")}
              className="rounded-full"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollContainer}
        className="flex overflow-x-auto gap-4 pb-4 px-4 hide-scrollbar snap-x snap-mandatory"
      >
        {featuredProducts.map((product) => (
          <div 
            key={product.id} 
            className="min-w-[300px] snap-start"
          >
            <ProductCard product={product} featured />
          </div>
        ))}
      </div>
    </div>
  );
}
