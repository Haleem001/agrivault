import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Search, TrendingUp, Package } from "lucide-react";
import { supabase } from "@/integrations/dummy/client";
import { useToast } from "@/hooks/use-toast";

const BuyerDashboard = () => {
  const [userName, setUserName] = useState("Buyer");
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
          // Check if user is a buyer
          if (profile.user_type !== 'buyer') {
            navigate("/dashboard");
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
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
                <Button variant="outline">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
          <p className="text-muted-foreground text-lg">
            Find fresh produce directly from farmers across Nigeria
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Orders</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Purchases</p>
                <p className="text-2xl font-bold">₦245,000</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saved This Month</p>
                <p className="text-2xl font-bold">15%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Action */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/10 border-2 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">Browse Fresh Produce</h2>
              <p className="text-muted-foreground text-lg mb-4">
                Direct access to quality produce from verified farmers. Get the best market prices with transparent sourcing.
              </p>
              <div className="flex gap-3">
                <Link to="/marketplace">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Search className="w-5 h-5 mr-2" />
                    Explore Marketplace
                  </Button>
                </Link>
                <Link to="/transactions">
                  <Button size="lg" variant="outline">
                    View Orders
                  </Button>
                </Link>
              </div>
            </div>
            <div className="text-6xl">🛒</div>
          </div>
        </Card>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center text-3xl">
                    🍅
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">50kg Tomatoes</h3>
                    <p className="text-sm text-muted-foreground">From Adamu Ibrahim</p>
                    <p className="text-sm text-green-600 font-medium mt-1">In Transit</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₦35,000</p>
                  <p className="text-sm text-muted-foreground">Ordered 2 days ago</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center text-3xl">
                    🥕
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">30kg Carrots</h3>
                    <p className="text-sm text-muted-foreground">From Fatima Ahmed</p>
                    <p className="text-sm text-blue-600 font-medium mt-1">Delivered</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₦18,000</p>
                  <p className="text-sm text-muted-foreground">Delivered 1 week ago</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
