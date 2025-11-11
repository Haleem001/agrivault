import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Truck, Shield, CreditCard, MapPin, Phone, User, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "/a-logo.png";

interface CheckoutItem {
  id: number;
  name: string;
  quantity: string;
  price: number;
  pricePerKg: number;
  image: string;
  seller: {
    name: string;
    location: string;
    rating: number;
    phone: string;
  };
  storage: string;
  quality: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the selected produce from location state
  const selectedProduce = location.state?.produce as CheckoutItem;
  
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Nigerian states for dropdown
  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
    "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
    "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  useEffect(() => {
    if (!selectedProduce) {
      // If no produce selected, redirect to marketplace
      navigate("/marketplace");
    }
  }, [selectedProduce, navigate]);

  const calculateDeliveryFee = () => {
    // Simple delivery fee calculation based on state
    const baseFee = 2000;
    const distanceFee = deliveryState === "Lagos" ? 0 : 1500;
    return baseFee + distanceFee;
  };

  const calculateTotal = () => {
    const subtotal = selectedProduce?.price || 0;
    const delivery = calculateDeliveryFee();
    const serviceFee = Math.round(subtotal * 0.02); // 2% service fee
    return subtotal + delivery + serviceFee;
  };

  const handleProceedToPayment = () => {
    if (!deliveryAddress || !deliveryCity || !deliveryState || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all delivery information fields",
        variant: "destructive",
      });
      return;
    }

    // Navigate to payment page with produce and delivery info
    navigate("/payment", {
      state: {
        produce: selectedProduce,
        deliveryInfo: {
          address: deliveryAddress,
          city: deliveryCity,
          state: deliveryState,
          phone: phoneNumber
        }
      }
    });
  };

  if (!selectedProduce) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/marketplace" className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Marketplace
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <img src={logo} alt="Agrivault Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-bold">Agrivault Checkout</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Details */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                <div className="flex gap-4">
                  <img 
                    src={selectedProduce.image}
                    alt={selectedProduce.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{selectedProduce.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground mt-2">
                      <p>Quantity: <span className="font-medium text-foreground">{selectedProduce.quantity}</span></p>
                      <p>Quality: <Badge variant="secondary">{selectedProduce.quality}</Badge></p>
                      <p>Storage: {selectedProduce.storage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ₦{selectedProduce.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₦{selectedProduce.pricePerKg}/kg
                    </p>
                  </div>
                </div>
              </Card>

              {/* Seller Information */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Seller Information</h2>
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-bold">{selectedProduce.seller.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedProduce.seller.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                      <span className="font-bold">{selectedProduce.seller.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono">{selectedProduce.seller.phone}</span>
                  </div>
                </div>
              </Card>

              {/* Delivery Information */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Delivery Information
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Input
                        id="address"
                        placeholder="Enter your delivery address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select value={deliveryState} onValueChange={setDeliveryState} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+234 XXX XXX XXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Delivery Information</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated delivery: 3-5 business days
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Delivery fee: ₦{calculateDeliveryFee().toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₦{selectedProduce.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium">₦{calculateDeliveryFee().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee (2%)</span>
                    <span className="font-medium">₦{Math.round(selectedProduce.price * 0.02).toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₦{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mt-6 text-lg py-6"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </Button>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>By placing this order, you agree to our</p>
                  <div className="flex justify-center gap-2 mt-1">
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    <span>&</span>
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;