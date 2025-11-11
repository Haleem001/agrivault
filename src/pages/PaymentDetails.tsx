import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Building, Truck, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/dummy/client";

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

interface DeliveryInfo {
  address: string;
  city: string;
  state: string;
  phone: string;
}

const PaymentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the selected produce and delivery info from location state
  const selectedProduce = location.state?.produce as CheckoutItem;
  const deliveryInfo = location.state?.deliveryInfo as DeliveryInfo;
  
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  // Card payment states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Bank transfer states
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");

  useEffect(() => {
    if (!selectedProduce || !deliveryInfo) {
      // If no produce or delivery info, redirect to checkout
      navigate("/checkout");
    }
  }, [selectedProduce, deliveryInfo, navigate]);

  const calculateDeliveryFee = () => {
    // Simple delivery fee calculation based on state
    const baseFee = 2000;
    const distanceFee = deliveryInfo.state === "Lagos" ? 0 : 1500;
    return baseFee + distanceFee;
  };

  const calculateTotal = () => {
    const subtotal = selectedProduce?.price || 0;
    const delivery = calculateDeliveryFee();
    const serviceFee = Math.round(subtotal * 0.02); // 2% service fee
    return subtotal + delivery + serviceFee;
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === "paystack" || paymentMethod === "flutterwave") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast({
          title: "Missing Card Information",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        return false;
      }
      // Basic card validation
      if (cardNumber.replace(/\s/g, "").length < 16) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid card number",
          variant: "destructive",
        });
        return false;
      }
    } else if (paymentMethod === "bank_transfer") {
      if (!accountName || !bankName) {
        toast({
          title: "Missing Bank Information",
          description: "Please fill in all bank details",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast({
        title: "Missing Payment Method",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    if (!validatePaymentDetails()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Generate order number
      const orderNum = `AGR${Date.now().toString().slice(-8)}`;
      setOrderNumber(orderNum);

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save order to database (dummy implementation)
      const { data, error } = await supabase
        .from('orders')
        .insert({
          buyer_id: 'dummy-buyer-id', // Would come from auth in real app
          produce_listing_id: selectedProduce.id.toString(),
          quantity_kg: parseInt(selectedProduce.quantity),
          total_price: calculateTotal(),
          delivery_address: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state}`,
          status: 'pending'
        });

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }

      setOrderCompleted(true);
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order ${orderNum} has been confirmed.`,
      });

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedProduce || !deliveryInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-4">
            Your order has been successfully placed
          </p>
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-bold text-lg">{orderNumber}</p>
          </div>
          <div className="space-y-3">
            <Button 
              className="w-full" 
              onClick={() => navigate("/transactions")}
            >
              View My Orders
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/marketplace")}
            >
              Continue Shopping
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={() => navigate("/checkout")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Checkout
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold">Agrivault Payment</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment Details</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
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
                      <p>Seller: <span className="font-medium text-foreground">{selectedProduce.seller.name}</span></p>
                      <p>Delivery: <span className="font-medium text-foreground">{deliveryInfo.city}, {deliveryInfo.state}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ₦{calculateTotal().toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                <div className="space-y-6">
                  <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paystack">Paystack</SelectItem>
                      <SelectItem value="flutterwave">Flutterwave</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cash_on_delivery">Cash on Delivery</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Card Payment Form */}
                  {paymentMethod === "paystack" || paymentMethod === "flutterwave" ? (
                    <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                      <h3 className="font-medium flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Card Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, "").replace(/(.{4})/g, "$1 "))}
                            maxLength={19}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value.replace(/(\d{2})(\d)/, "$1/$2"))}
                              maxLength={5}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Bank Transfer Form */}
                  {paymentMethod === "bank_transfer" ? (
                    <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                      <h3 className="font-medium flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Bank Transfer Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="accountName">Account Name</Label>
                          <Input
                            id="accountName"
                            placeholder="Agrivault Nigeria Ltd"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Select value={bankName} onValueChange={setBankName} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="access">Access Bank</SelectItem>
                              <SelectItem value="zenith">Zenith Bank</SelectItem>
                              <SelectItem value="gtb">Guaranty Trust Bank</SelectItem>
                              <SelectItem value="first">First Bank</SelectItem>
                              <SelectItem value="uba">United Bank for Africa</SelectItem>
                              <SelectItem value="wema">Wema Bank</SelectItem>
                              <SelectItem value="sterling">Sterling Bank</SelectItem>
                              <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                              <SelectItem value="union">Union Bank</SelectItem>
                              <SelectItem value="eco">Ecobank Nigeria</SelectItem>
                              <SelectItem value="heritage">Heritage Bank</SelectItem>
                              <SelectItem value="keystone">Keystone Bank</SelectItem>
                              <SelectItem value="polaris">Polaris Bank</SelectItem>
                              <SelectItem value="stanbic">Stanbic IBTC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-blue-800">Account Information</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Account Number: <span className="font-mono">1234567890</span>
                          </p>
                          <p className="text-sm text-blue-700">
                            Account Name: <span className="font-mono">Agrivault Nigeria Ltd</span>
                          </p>
                          <p className="text-xs text-blue-600 mt-2">
                            Please include your order number as reference when making payment
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Cash on Delivery Info */}
                  {paymentMethod === "cash_on_delivery" ? (
                    <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                      <h3 className="font-medium flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Cash on Delivery
                      </h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-yellow-800">Payment Instructions</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          Please have the exact amount ready when our delivery agent arrives.
                          Additional charges may apply for change processing.
                        </p>
                        <p className="text-sm text-yellow-700 mt-2">
                          Total amount to pay: <span className="font-bold">₦{calculateTotal().toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Secure Payment</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your payment information is encrypted and secure. We protect your data with industry-standard security measures.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Price Breakdown</h2>
                
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
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    "Complete Order"
                  )}
                </Button>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>By completing this order, you agree to our</p>
                  <div className="flex justify-center gap-2 mt-1">
                    <span>Terms of Service</span>
                    <span>&</span>
                    <span>Privacy Policy</span>
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

export default PaymentDetails;