import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isOnline, addToOfflineQueue } from "@/lib/offline";
import tomatoes from "@/assets/tomatoes.jpg";
import carrots from "@/assets/carrots.jpg";
import yellowPepper from "@/assets/yellow-pepper.jpg";

const SellProduce = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const inventory = [
    {
      id: "1",
      name: "Tomatoes",
      quantity: "50kg",
      image: tomatoes,
      marketPrice: "₦450/kg",
      totalValue: "₦22,500",
    },
    {
      id: "2",
      name: "Carrots",
      quantity: "10kg",
      image: carrots,
      marketPrice: "₦600/kg",
      totalValue: "₦6,000",
    },
    {
      id: "3",
      name: "Yellow Pepper",
      quantity: "15kg",
      image: yellowPepper,
      marketPrice: "₦800/kg",
      totalValue: "₦12,000",
    },
  ];

  const handleSell = (item: typeof inventory[0]) => {
    setSelectedItem(item.id);
    
    if (!isOnline()) {
      // Save to offline queue
      addToOfflineQueue({
        type: 'produce_listing',
        data: {
          name: item.name,
          quantity: item.quantity,
          price: item.marketPrice,
        },
      });
      
      toast({
        title: "Saved Offline! 📱",
        description: `Your ${item.name} listing will be posted when you're back online.`,
        variant: "default",
      });
      
      setTimeout(() => navigate("/dashboard"), 1500);
      return;
    }
    
    setTimeout(() => {
      toast({
        title: "SUCCESS! 🎉",
        description: `Your ${item.quantity} of ${item.name} is now in the market. We'll notify you when a buyer responds!`,
      });
      
      setTimeout(() => navigate("/dashboard"), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Agrivault</span>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Sell My Produce</h1>
            <p className="text-muted-foreground">Get the best market offers for your stored produce</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {inventory.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600">
                    In Storage
                  </Badge>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{item.name}</h3>
                    <p className="text-3xl font-bold text-green-600">{item.quantity}</p>
                  </div>

                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Market Price:</span>
                      <span className="font-bold text-foreground">{item.marketPrice}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Value:</span>
                      <span className="font-bold text-lg text-green-600">{item.totalValue}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Best market offer available</span>
                  </div>

                  <Button 
                    onClick={() => handleSell(item)}
                    disabled={selectedItem === item.id}
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                    size="lg"
                  >
                    {!isOnline() && <WifiOff className="w-5 h-5 mr-2" />}
                    {selectedItem === item.id ? "Processing..." : isOnline() ? "Sell Now" : "Save for Later"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {inventory.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground mb-4">No produce in storage yet</p>
              <Link to="/book-storage">
                <Button className="bg-green-600 hover:bg-green-700">
                  Book Storage
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellProduce;
