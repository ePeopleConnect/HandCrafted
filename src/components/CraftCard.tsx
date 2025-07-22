import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";

interface CraftItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  featured?: boolean;
}

interface CraftCardProps {
  item: CraftItem;
  onAddToCart: (item: CraftItem) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

export function CraftCard({ item, onAddToCart, onToggleFavorite, isFavorite }: CraftCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300 bg-gradient-card border-0">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {item.featured && (
              <Badge variant="secondary" className="bg-craft-blush text-foreground">
                Featured
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background ${
                isFavorite ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={() => onToggleFavorite(item.id)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
          {!item.inStock && (
            <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-1">
            {item.name}
          </CardTitle>
          <span className="text-lg font-bold text-craft-terracotta">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {item.description}
        </p>
        <Badge variant="outline" className="text-xs">
          {item.category}
        </Badge>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(item)}
          disabled={!item.inStock}
          className="w-full"
          variant="default"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}