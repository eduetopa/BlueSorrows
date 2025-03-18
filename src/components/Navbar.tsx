
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Search, 
  PenSquare,
  Home,
  Sparkles,
  Heart
} from "lucide-react";
import { AuthNavItem } from "./AuthNavItem";

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export default function Navbar({ toggleTheme, isDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-6 w-6 text-primary mr-2 fill-primary" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-blue-500">Blue</span> Sorrows
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-4 w-4 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/explore" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-4 w-4 mr-1" />
              <span>Explore</span>
            </Link>
            <Link to="/premium" className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
              <Sparkles className="h-4 w-4 mr-1" />
              <span>Premium</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle theme">
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={toggleTheme}>
                  {isDarkMode ? "Light mode" : "Dark mode"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AuthNavItem />

            <Button onClick={toggleMenu} variant="ghost" size="icon" className="md:hidden">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-4 py-3 space-y-3 bg-background shadow-md">
            <Link to="/" className="flex items-center p-2 text-foreground hover:bg-accent rounded-md">
              <Home className="h-5 w-5 mr-2" />
              <span>Home</span>
            </Link>
            <Link to="/explore" className="flex items-center p-2 text-foreground hover:bg-accent rounded-md">
              <Heart className="h-5 w-5 mr-2" />
              <span>Explore</span>
            </Link>
            <Link to="/premium" className="flex items-center p-2 text-blue-500 hover:bg-blue-50 rounded-md">
              <Sparkles className="h-5 w-5 mr-2" />
              <span>Premium</span>
            </Link>
            <Link to="/write" className="flex items-center p-2 text-foreground hover:bg-accent rounded-md">
              <PenSquare className="h-5 w-5 mr-2" />
              <span>Write</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
