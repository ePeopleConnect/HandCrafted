import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import embroideryHero from "@/assets/embroidery-hero.jpg";

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreCategories: () => void;
}

export function HeroSection({ onShopNow, onExploreCategories }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={embroideryHero}
          alt="Beautiful handmade crafts"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-craft-terracotta/80 via-craft-blush/60 to-craft-sage/40" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Sparkles className="h-8 w-8 text-white/60" />
      </div>
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="h-6 w-6 text-white/40" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <Sparkles className="h-5 w-5 text-white/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Handcrafted
          <span className="block bg-gradient-to-r from-craft-cream to-white bg-clip-text text-transparent">
            with Love
          </span>
          <span className="block bg-gradient-to-r from-craft-cream to-white bg-clip-text text-transparent">
            from Roxane
          </span>
          <span className="block bg-gradient-to-r from-craft-cream to-white bg-clip-text text-transparent">
            and Friends
          </span>

        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover unique, handmade treasures from talented artisans. 
          From embroidery to scrapbooking, each piece tells a story.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="hero"
            size="lg"
            onClick={onShopNow}
            className="px-8 py-4 text-lg"
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onExploreCategories}
            className="px-8 py-4 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
          >
            Explore Categories
          </Button>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-sm">Unique Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-sm">Talented Artisans</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10k+</div>
            <div className="text-sm">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}