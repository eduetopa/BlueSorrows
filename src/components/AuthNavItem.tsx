
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogOut, User, Settings, ChevronDown, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AuthNavItem() {
  const { user, profile, signOut, loading } = useAuth();

  if (loading) {
    return (
      <Button variant="ghost" disabled className="gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </Button>
    );
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/login">Sign in</Link>
        </Button>
        <Button asChild>
          <Link to="/signup">Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {profile?.email ? profile.email.substring(0, 2).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{profile?.email || "User"}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{profile?.email || "User"}</p>
            <p className="text-xs text-muted-foreground">{profile?.role || "user"}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex w-full cursor-pointer items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex w-full cursor-pointer items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={signOut} 
          disabled={loading}
          className="flex items-center text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
