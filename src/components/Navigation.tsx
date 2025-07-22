import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "@/components/ShoppingCart";
import { Input } from "@/components/ui/input";
import { Search, Heart, Menu, X, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { supabase } from "@/integrations/supabase/client";
// import { User as SupabaseUser } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface NavigationProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onSearch: (query: string) => void;
  onShowFavorites: () => void;
  searchQuery: string;
}

export function Navigation({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onSearch,
  onShowFavorites,
  searchQuery
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Get initial session
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setUser(session?.user ?? null);
  //   });

  //   // Listen for auth changes
  //   const { data: { subscription } } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       setUser(session?.user ?? null);
  //     }
  //   );

  //   return () => subscription.unsubscribe();
  // }, []);

  // const handleSignOut = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     toast({
  //       title: "Error",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   } else {
  //     toast({
  //       title: "Signed out",
  //       description: "You have been signed out successfully.",
  //     });
  //   }
  // };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HC</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Hand Crafted</h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search handmade crafts..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onShowFavorites}
              className="text-muted-foreground hover:text-foreground"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <ShoppingCart
              cartItems={cartItems}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
              onCheckout={onCheckout}
            />
            {/*
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/auth")}> 
                Sign In
              </Button>
            )}
            */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 pt-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search handmade crafts..."
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      onClick={onShowFavorites}
                      className="justify-start"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Favorites
                    </Button>
                    <div className="flex items-center gap-2">
                      <ShoppingCart
                        cartItems={cartItems}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemoveItem={onRemoveItem}
                        onCheckout={onCheckout}
                      />
                    </div>
                    {/*
                    {user ? (
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="justify-start"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigate("/auth");
                          setIsMobileMenuOpen(false);
                        }}
                        className="justify-start"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    )}
                    */}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}