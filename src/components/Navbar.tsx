import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDisconnect } from "wagmi";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { logout, isAdminAuthenticated, isStudentAuthenticated } from "@/lib/auth";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const hideNavbarRoutes = ["/admin-login", "/student-login"];
  const isAuthenticated = isAdminAuthenticated() || isStudentAuthenticated();

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    logout();
    disconnect();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto justify-between">
        <Link to="/" className="font-serif font-bold text-xl tracking-tight hover:text-primary transition-colors">
          PRASASTI
        </Link>

        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground transition-colors")}>
                  <Link to="/">
                    Beranda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground transition-colors")}>
                  <Link to="/create">
                    Portal Admin
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground transition-colors")}>
                  <Link to="/verify">
                    Portal Mahasiswa
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {isAuthenticated && (
            <Button size="sm" onClick={handleLogout} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
              Keluar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
