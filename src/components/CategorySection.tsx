import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

interface CategorySectionProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

export function CategorySection({ categories, onCategorySelect }: CategorySectionProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Explore Our Craft Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover beautiful handmade items across our carefully curated categories. 
            Each piece is crafted with love and attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden border-0 bg-gradient-card hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-white/80 mb-2">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {category.itemCount} items
                      </span>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCategorySelect(category.id);
                        }}
                      >
                        Explore {category.name}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}