import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Package, 
  ShoppingCart, 
  User,
  Plus,
  Smile,
  Warehouse
} from "lucide-react";
import { supabase } from "@/integrations/dummy/client";
import { useToast } from "@/hooks/use-toast";

const FarmersDashboard = () => {
  const [userName, setUserName] = useState("Farmer");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          // Redirect to auth if not logged in
          navigate("/auth");
          return;
        }
        
        const { data: profile } = await supabase
          .from('profiles')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          // Check if user is a farmer
          if (profile.user_type !== 'farmer') {
            navigate("/buyer-dashboard");
            return;
          }
          setUserName(profile.full_name);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [toast, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Agrivault</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/about-us">
                <Button variant="ghost">About Us</Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {userName}! 👋</h1>
            <p className="text-muted-foreground">Here's what's happening with your farm today</p>
          </div>

          {/* Main CTAs */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link to="/book-storage">
              <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary group bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Store & List Produce</h3>
                    <p className="text-muted-foreground mb-3">
                      Store your produce safely in climate-controlled facilities, then list it for sale
                    </p>
                    <div className="flex items-center text-sm text-primary font-medium">
                      <span>Book Storage</span>
                      <Plus className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/sell-produce">
              <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-600 group bg-gradient-to-br from-green-50 to-green-100">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">List & Sell Produce</h3>
                    <p className="text-muted-foreground mb-3">
                      Directly list your fresh produce to the marketplace and connect with buyers instantly
                    </p>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <span>Go to Marketplace</span>
                      <ShoppingCart className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Storage Status */}
          <Card className="p-8 mb-8 bg-gradient-to-r from-green-50 to-white border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    You have 50kg of Tomatoes in storage
                  </h3>
                  <div className="flex items-center gap-2 text-green-600">
                    <Smile className="w-5 h-5" />
                    <span className="font-medium">Your produce is FRESH</span>
                  </div>
                </div>
              </div>
              <Link to="/profile">
                <Button variant="outline" className="gap-2">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Links */}
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/storage-facilities">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Warehouse className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg">Storage Facilities</h3>
                </div>
                <p className="text-sm text-muted-foreground">View available facilities</p>
              </Card>
            </Link>

            <Link to="/transactions">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg">My Orders</h3>
                </div>
                <p className="text-sm text-muted-foreground">Track sales & deliveries</p>
              </Card>
            </Link>

            <Link to="/subscription">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg">Subscription</h3>
                </div>
                <p className="text-sm text-muted-foreground">Manage your plan</p>
              </Card>
            </Link>

            <Link to="/profile">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg">My Profile</h3>
                </div>
                <p className="text-sm text-muted-foreground">View storage & earnings</p>
              </Card>
            </Link>
          </div>

          {/* Story Section */}
          <Card className="mt-6 p-8 bg-gradient-to-br from-blue-50 to-green-50 border-green-200">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
              Meet Adamu: A Success Story
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
              Adamu is a tomato farmer from Bauchi. He was worried about his harvest spoiling before he could sell it.
              He discovered Agrivault and now stores his produce in climate-controlled facilities, connects with verified buyers,
              and earns more from every harvest. Join thousands of farmers like Adamu who are transforming their agricultural business with Agrivault.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmersDashboard;
