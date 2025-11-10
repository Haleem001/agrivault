import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, TrendingUp, Calendar, CheckCircle } from "lucide-react";

const Profile = () => {
  const farmerName = localStorage.getItem("farmerName") || "Adamu";

  const storageItems = [
    {
      id: "1",
      produce: "Tomatoes",
      quantity: "50kg",
      storedSince: "Oct 26, 2024",
      status: "Fresh",
      statusColor: "bg-green-500",
    },
    {
      id: "2",
      produce: "Carrots",
      quantity: "10kg",
      storedSince: "Nov 2, 2024",
      status: "Fresh",
      statusColor: "bg-green-500",
    },
    {
      id: "3",
      produce: "Yellow Pepper",
      quantity: "15kg",
      storedSince: "Nov 5, 2024",
      status: "Fresh",
      statusColor: "bg-green-500",
    },
  ];

  const salesHistory = [
    {
      id: "1",
      produce: "Tomatoes",
      quantity: "100kg",
      amount: "₦45,000",
      date: "Oct 20, 2024",
    },
    {
      id: "2",
      produce: "Peppers",
      quantity: "30kg",
      amount: "₦24,000",
      date: "Oct 15, 2024",
    },
    {
      id: "3",
      produce: "Onions",
      quantity: "80kg",
      amount: "₦32,000",
      date: "Oct 10, 2024",
    },
  ];

  const totalEarnings = salesHistory.reduce((sum, sale) => {
    return sum + parseFloat(sale.amount.replace(/[₦,]/g, ""));
  }, 0);

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
            <h1 className="text-4xl font-bold text-foreground mb-2">{farmerName}'s Profile</h1>
            <p className="text-muted-foreground">View your storage status and earnings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {storageItems.reduce((sum, item) => sum + parseFloat(item.quantity), 0)}kg
              </h3>
              <p className="text-sm text-muted-foreground">Total in Storage</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">₦{totalEarnings.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{salesHistory.length}</h3>
              <p className="text-sm text-muted-foreground">Completed Sales</p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Storage Status */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-green-600" />
                Current Storage
              </h2>
              <div className="space-y-4">
                {storageItems.map((item) => (
                  <div key={item.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{item.produce}</h3>
                        <p className="text-sm text-muted-foreground">{item.quantity}</p>
                      </div>
                      <Badge className={`${item.statusColor} text-white`}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Stored since {item.storedSince}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Earnings History */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Sales History
              </h2>
              <div className="space-y-4">
                {salesHistory.map((sale) => (
                  <div key={sale.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{sale.produce}</h3>
                        <p className="text-sm text-muted-foreground">{sale.quantity}</p>
                      </div>
                      <span className="font-bold text-lg text-green-600">{sale.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{sale.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-muted-foreground">Total Earnings:</span>
                  <span className="text-3xl font-bold text-green-600">₦{totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
