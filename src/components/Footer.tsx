
import { Link } from "react-router-dom";
import { BookOpen, Twitter, Instagram, Facebook, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold tracking-tight">Blue Sorrows</span>
            </div>
            <p className="text-muted-foreground text-sm">
              A platform for writers and readers of sensual stories. Share your tales and discover new worlds of desire.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-foreground text-sm">Categories</Link>
              </li>
              <li>
                <Link to="/popular" className="text-muted-foreground hover:text-foreground text-sm">Popular</Link>
              </li>
              <li>
                <Link to="/recent" className="text-muted-foreground hover:text-foreground text-sm">Recent</Link>
              </li>
              <li>
                <Link to="/completed" className="text-muted-foreground hover:text-foreground text-sm">Completed</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/writers" className="text-muted-foreground hover:text-foreground text-sm">Writers</Link>
              </li>
              <li>
                <Link to="/forums" className="text-muted-foreground hover:text-foreground text-sm">Forums</Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground text-sm">Events</Link>
              </li>
              <li>
                <Link to="/premium" className="text-primary hover:text-primary/80 text-sm">Premium</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">About us</Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground text-sm">Help</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Blue Sorrows. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-muted-foreground flex items-center justify-center">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500 mx-1" />
          <span>for the community of passionate writers</span>
        </div>
      </div>
    </footer>
  );
}
