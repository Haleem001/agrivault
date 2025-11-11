import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "/a-logo.png";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 5000,
      period: "month",
      description: "Perfect for small-scale farmers",
      features: [
        "Up to 5 produce listings",
        "Basic storage facilities access",
        "Email support",
        "2% transaction fee",
        "Standard delivery network"
      ],
      recommended: false
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: 12000,
      period: "month",
      description: "Best for growing farms",
      features: [
        "Unlimited produce listings",
        "Priority storage facilities",
        "24/7 phone & email support",
        "1% transaction fee",
        "Express delivery network",
        "Analytics dashboard",
        "Verified seller badge"
      ],
      recommended: true
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 25000,
      period: "month",
      description: "For large-scale operations",
      features: [
        "Everything in Premium",
        "Dedicated account manager",
        "Custom storage solutions",
        "0.5% transaction fee",
        "Bulk pricing discounts",
        "API access",
        "White-label options",
        "Priority buyer connections"
      ],
      recommended: false
    }
  ];

  const storageOptions = [
    {
      id: "cold",
      name: "Cold Storage",
      price: 500,
      unit: "kg/week",
      temperature: "0-4°C",
      suitable: "Vegetables, Fruits"
    },
    {
      id: "climate",
      name: "Climate-Controlled",
      price: 400,
      unit: "kg/week",
      temperature: "15-20°C",
      suitable: "Grains, Tubers"
    },
    {
      id: "standard",
      name: "Standard Storage",
      price: 250,
      unit: "kg/week",
      temperature: "Room Temperature",
      suitable: "Dried Goods"
    }
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Subscription Activated! 🎉",
      description: "Your payment has been processed. Welcome to Agrivault Premium!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Agrivault Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-2xl font-bold text-foreground">Agrivault</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan 💳
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the perfect plan for your farming business. All plans include secure payments and verified buyer access.
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Subscription Plans</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`p-6 relative ${
                  plan.recommended 
                    ? "border-2 border-primary shadow-lg" 
                    : ""
                }`}
              >
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    <Star className="w-3 h-3 mr-1 fill-white" />
                    Recommended
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      ₦{plan.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={selectedPlan === plan.id}
                >
                  {selectedPlan === plan.id ? "Current Plan" : "Subscribe Now"}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Storage Rates */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Storage Facility Rates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {storageOptions.map((storage) => (
              <Card key={storage.id} className="p-6">
                <h3 className="text-xl font-bold mb-3">{storage.name}</h3>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">
                    ₦{storage.price}
                  </span>
                  <span className="text-muted-foreground">/{storage.unit}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Temperature:</span>
                    <p className="font-medium">{storage.temperature}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Best for:</span>
                    <p className="font-medium">{storage.suitable}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <Card className="mt-12 p-8 max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Secure Payment Processing</h3>
              <p className="text-muted-foreground mb-4">
                All transactions are secured with bank-grade encryption. We accept payments via:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Bank Transfer</Badge>
                <Badge variant="secondary">Card Payment</Badge>
                <Badge variant="secondary">USSD</Badge>
                <Badge variant="secondary">Mobile Money</Badge>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Subscription;
