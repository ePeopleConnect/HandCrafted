import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CraftCard } from "@/components/CraftCard";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import embroideryHero from "@/assets/embroidery-hero.jpg";
import cardsHero from "@/assets/cards-hero.jpg";
import scrapbookHero from "@/assets/scrapbook-hero.jpg";
import artsCraftsHero from "@/assets/arts-crafts-hero.jpg";
import floralEmbroideryHoopArt from "@/assets/floral-embroidery-hoop-art.jpeg";
import vintageBirthdayCardSet from "@/assets/vintage-birthday-card-set.jpeg";
import travelScrapbookKit from "@/assets/travel-scrapbook-kit.jpeg";
import watercolorPaintSet from "@/assets/watercolor-paint-set.jpeg";
import crossStitchSampler from "@/assets/cross-stitch-sampler.jpeg";
import weddingInvitationSuite from "@/assets/wedding-invitation-suite.jpeg";
import botanicalEmbroideryKit from "@/assets/botanical-embroidery-kit.jpeg";
import thankYouCardCollection from "@/assets/thank-you-card-collection.jpeg";
import babyMemoryBook from "@/assets/baby-memory-book.jpeg";
import acrylicPaintStarterKit from "@/assets/acrylic-paint-starter-kit.jpeg";
import frenchKnotEmbroidery from "@/assets/french-knot-embroidery.jpeg";
import popUpBirthdayCards from "@/assets/pop-up-birthday-cards.jpeg";
import weddingScrapbookAlbum from "@/assets/wedding-scrapbook-album.jpeg";
import oilPastelArtSet from "@/assets/oil-pastel-art-set.jpeg";
import holidayCardBundle from "@/assets/holiday-card-bundle.jpeg";
import natureEmbroideryHoop from "@/assets/nature-embroidery-hoop.jpeg";
import anniversaryScrapbook from "@/assets/anniversary-scrapbook.jpeg";
import mixedMediaArtKit from "@/assets/mixed-media-art-kit.jpeg";
import modernEmbroideryArt from "@/assets/modern-embroidery-art.jpeg";
import sympathyCardSet from "@/assets/sympathy-card-set.jpeg";

// Mock data for the application
const categories = [
  {
    id: "Embroidery",
    name: "Embroidery",
    description: "Beautiful hand-stitched designs",
    image: embroideryHero,
    itemCount: 6
  },
  {
    id: "Card Making",
    name: "Card Making",
    description: "Handcrafted greeting cards",
    image: cardsHero,
    itemCount: 6
  },
  {
    id: "Scrapbooking",
    name: "Scrapbooking",
    description: "Memory keeping supplies",
    image: scrapbookHero,
    itemCount: 4
  },
  {
    id: "Arts & Crafts",
    name: "Arts & Crafts",
    description: "Creative supplies and kits",
    image: artsCraftsHero,
    itemCount: 4
  }
];

const craftItems = [
  {
    id: "1",
    name: "Floral Embroidery Hoop Art",
    description: "Hand-embroidered wildflowers on natural linen with wooden hoop frame",
    price: 45.99,
    image: floralEmbroideryHoopArt,
    category: "Embroidery",
    inStock: true,
    featured: true
  },
  {
    id: "2",
    name: "Vintage Birthday Card Set",
    description: "Set of 6 handmade cards with pressed flowers and watercolor details",
    price: 18.50,
    image: vintageBirthdayCardSet,
    category: "Card Making",
    inStock: true,
    featured: false
  },
  {
    id: "3",
    name: "Travel Scrapbook Kit",
    description: "Complete kit with papers, stickers, and tools for documenting adventures",
    price: 32.99,
    image: travelScrapbookKit,
    category: "Scrapbooking",
    inStock: true,
    featured: true
  },
  {
    id: "4",
    name: "Watercolor Paint Set",
    description: "Professional quality watercolors with brushes and paper pad",
    price: 28.75,
    image: watercolorPaintSet,
    category: "Arts & Crafts",
    inStock: false,
    featured: false
  },
  {
    id: "5",
    name: "Cross-Stitch Sampler",
    description: "Traditional alphabet sampler with vintage charm and detailed instructions",
    price: 35.00,
    image: crossStitchSampler,
    category: "Embroidery",
    inStock: true,
    featured: false
  },
  {
    id: "6",
    name: "Wedding Invitation Suite",
    description: "Elegant handmade invitations with calligraphy and floral accents",
    price: 89.99,
    image: weddingInvitationSuite,
    category: "Card Making",
    inStock: true,
    featured: true
  },
  {
    id: "7",
    name: "Botanical Embroidery Kit",
    description: "Modern botanical design with eucalyptus and lavender patterns",
    price: 29.99,
    image: botanicalEmbroideryKit,
    category: "Embroidery",
    inStock: true,
    featured: true
  },
  {
    id: "8",
    name: "Thank You Card Collection",
    description: "Set of 8 minimalist thank you cards with gold foil accents",
    price: 22.00,
    image: thankYouCardCollection,
    category: "Card Making",
    inStock: true,
    featured: false
  },
  {
    id: "9",
    name: "Baby Memory Book",
    description: "Soft pastel scrapbook for baby's first year with milestone pages",
    price: 54.99,
    image: babyMemoryBook,
    category: "Scrapbooking",
    inStock: true,
    featured: false
  },
  {
    id: "10",
    name: "Acrylic Paint Starter Kit",
    description: "Vibrant acrylic paints with canvas boards and palette knives",
    price: 34.50,
    image: acrylicPaintStarterKit,
    category: "Arts & Crafts",
    inStock: true,
    featured: false
  },
  {
    id: "11",
    name: "French Knot Embroidery",
    description: "Delicate floral design featuring French knots and chain stitches",
    price: 38.75,
    image: frenchKnotEmbroidery,
    category: "Embroidery",
    inStock: true,
    featured: false
  },
  {
    id: "12",
    name: "Pop-Up Birthday Cards",
    description: "Fun 3D pop-up cards with intricate paper engineering",
    price: 26.99,
    image: popUpBirthdayCards,
    category: "Card Making",
    inStock: true,
    featured: true
  },
  {
    id: "13",
    name: "Wedding Scrapbook Album",
    description: "Elegant album with lace details and photo pockets",
    price: 78.00,
    image: weddingScrapbookAlbum,
    category: "Scrapbooking",
    inStock: true,
    featured: true
  },
  {
    id: "14",
    name: "Oil Pastel Art Set",
    description: "Smooth oil pastels with blending tools and textured paper",
    price: 41.25,
    image: oilPastelArtSet,
    category: "Arts & Crafts",
    inStock: true,
    featured: false
  },
  {
    id: "15",
    name: "Holiday Card Bundle",
    description: "Festive Christmas and New Year cards with metallic details",
    price: 32.50,
    image: holidayCardBundle,
    category: "Card Making",
    inStock: true,
    featured: false
  },
  {
    id: "16",
    name: "Nature Embroidery Hoop",
    description: "Mountain landscape embroidery with sunset gradient threads",
    price: 52.99,
    image: natureEmbroideryHoop,
    category: "Embroidery",
    inStock: true,
    featured: true
  },
  {
    id: "17",
    name: "Anniversary Scrapbook",
    description: "Romantic scrapbook with vintage lace and photo corners",
    price: 64.99,
    image: anniversaryScrapbook,
    category: "Scrapbooking",
    inStock: true,
    featured: false
  },
  {
    id: "18",
    name: "Mixed Media Art Kit",
    description: "Complete kit with various mediums for experimental art",
    price: 67.50,
    image: mixedMediaArtKit,
    category: "Arts & Crafts",
    inStock: true,
    featured: true
  },
  {
    id: "19",
    name: "Modern Embroidery Art",
    description: "Contemporary geometric patterns with metallic threads",
    price: 42.00,
    image: modernEmbroideryArt,
    category: "Embroidery",
    inStock: true,
    featured: false
  },
  {
    id: "20",
    name: "Sympathy Card Set",
    description: "Thoughtful condolence cards with pressed flower details",
    price: 19.99,
    image: sympathyCardSet,
    category: "Card Making",
    inStock: true,
    featured: false
  }
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    let filtered = craftItems;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (showFavorites) {
      filtered = filtered.filter(item => favorites.has(item.id));
    }

    return filtered;
  }, [searchQuery, selectedCategory, showFavorites, favorites]);

  const handleAddToCart = (item: typeof craftItems[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });

    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
      variant: "destructive",
    });
  };

  const handleCheckout = async () => {
    try {
      toast({
        title: "Payment Processing",
        description: "Processing your payment...",
      });

      // ...existing payment logic...
      // Simulate payment success (replace with real payment logic)
      // After payment is confirmed:
      setCartItems([]);
      toast({
        title: "Payment Successful!",
        description: "Your cart has been emptied.",
      });
    } catch (error) {
      toast({
        title: "Checkout Error",
        description: "Failed to start checkout process",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast({
          title: "Removed from favorites",
          description: "Item has been removed from your favorites.",
        });
      } else {
        newFavorites.add(id);
        toast({
          title: "Added to favorites",
          description: "Item has been added to your favorites.",
        });
      }
      return newFavorites;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
    setShowFavorites(false);
  };

  const handleShopNow = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExploreCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onSearch={setSearchQuery}
        onShowFavorites={handleShowFavorites}
        searchQuery={searchQuery}
      />

      <HeroSection
        onShopNow={handleShopNow}
        onExploreCategories={handleExploreCategories}
      />

      <div id="categories">
        <CategorySection
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* Products Section */}
      <section id="products" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {showFavorites 
                  ? "Your Favorites" 
                  : selectedCategory 
                    ? `${selectedCategory} Collection`
                    : "Featured Crafts"
                }
              </h2>
              <p className="text-muted-foreground">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center gap-2">
              {selectedCategory && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Clear Filter
                </Button>
              )}
              {showFavorites && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFavorites(false)}
                >
                  Show All
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                {showFavorites 
                  ? "No favorites yet. Start adding some beautiful crafts!"
                  : "No items found matching your search."
                }
              </p>
              {(searchQuery || selectedCategory || showFavorites) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setShowFavorites(false);
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1 max-w-2xl mx-auto"
            }`}>
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CraftCard
                    item={item}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.has(item.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HC</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Hand Crafted</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Connecting you with talented artisans and their beautiful handmade creations.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 HandCrafted. Made with ❤️ for craft lovers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
