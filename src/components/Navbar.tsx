import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Agrivault</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors scroll-smooth">Features</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors scroll-smooth">How It Works</a>
            <Link to="/about-us">
              <Button variant="ghost">About Us</Button>
            </Link>
            <Link to="/ussd-simulation">
              <Button variant="ghost">USSD/SMS</Button>
            </Link>
            <Link to="/onboarding">
              <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
            </Link>
          </div>

          <button className="md:hidden">
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;