import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Thermometer, Shield, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isOnline, addToOfflineQueue } from "@/lib/offline";
import { supabase } from "@/integrations/dummy/client";

const BookStorage = () => {
  const [produceType, setProduceType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const calculatePrice = () => {
    const qty = parseFloat(quantity) || 0;
    const dur = parseFloat(duration) || 0;
    return (qty * dur * 500).toLocaleString(); // ₦500 per kg per week
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOnline()) {
      // Save to offline queue
      addToOfflineQueue({
        type: 'booking',
        data: {
          produceType,
          quantity,
          duration,
          location,
          pickupDate,
        },
      });
      
      toast({
        title: "Saved Offline! 📱",
        description: "Your booking will be processed when you're back online.",
        variant: "default",
      });
      
      setTimeout(() => navigate("/dashboard"), 1500);
      return;
    }
    
    // Save to dummy database
    try {
      const { data, error } = await supabase
        .from('storage_bookings')
        .insert({
          farmer_id: 'dummy-user-id', // Would come from auth in real app
          produce_listing_id: null,
          storage_facility_id: '1', // Default to first facility
          quantity_kg: parseFloat(quantity),
          start_date: pickupDate,
          end_date: null,
          status: 'active'
        });
      
      if (error) {
        console.error('Error saving booking:', error);
        toast({
          title: "Error",
          description: "Failed to save booking. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Storage Booked Successfully! 🎉",
          description: `Your ${quantity}kg of ${produceType} will be stored safely.`,
        });
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to save booking. Please try again.",
        variant: "destructive",
      });
    }
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
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Book Storage</h1>
          <p className="text-lg text-muted-foreground mb-8">Reserve climate-controlled storage for your produce</p>

          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="produce" className="text-base">Produce Type</Label>
                <Select value={produceType} onValueChange={setProduceType} required>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select produce type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tomatoes">Tomatoes</SelectItem>
                    <SelectItem value="Peppers">Peppers</SelectItem>
                    <SelectItem value="Carrots">Carrots</SelectItem>
                    <SelectItem value="Onions">Onions</SelectItem>
                    <SelectItem value="Yams">Yams</SelectItem>
                    <SelectItem value="Cassava">Cassava</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="quantity" className="text-base">Quantity (kg)</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity in kg"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="duration" className="text-base">Estimated Duration (weeks)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="How many weeks?"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="location" className="text-base">Pickup Location</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your farm location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="date" className="text-base">Pickup Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>

              {quantity && duration && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-foreground mb-2">Pricing Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage Rate:</span>
                      <span className="font-medium">₦500/kg/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-medium">{quantity} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{duration} weeks</span>
                    </div>
                    <div className="border-t border-green-200 pt-2 mt-2 flex justify-between">
                      <span className="font-bold text-lg">Total Cost:</span>
                      <span className="font-bold text-lg text-green-700">₦{calculatePrice()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Thermometer className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Climate-Controlled Storage</p>
                    <p className="text-sm text-muted-foreground">We handle your goods at the required temperature to maintain freshness</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Quality Guarantee</p>
                    <p className="text-sm text-muted-foreground">Your produce is insured and monitored 24/7</p>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                {!isOnline() && <WifiOff className="w-5 h-5 mr-2" />}
                {isOnline() ? "Confirm Booking" : "Save Booking for Later"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookStorage;
