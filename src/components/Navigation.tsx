import { Link, useLocation } from "react-router-dom";
import { Home, Package, Plus, Settings, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Tableau de bord" },
    { path: "/assets", icon: Package, label: "Mes biens" },
    { path: "/add-asset", icon: Plus, label: "Ajouter" },
    { path: "/about", icon: Info, label: "À propos" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-card border-b shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-secondary">MonRoa</h1>
            <p className="text-xs text-muted-foreground">Gestion</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "gap-2",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
          
          <Button
            variant="ghost"
            onClick={() => signOut()}
            className="gap-2 ml-2"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex flex-col gap-1 h-auto py-2",
                    isActive && "text-primary"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                  <span className="text-xs">{item.label.split(' ')[0]}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;