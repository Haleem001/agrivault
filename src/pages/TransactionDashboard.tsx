import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, TrendingUp, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import logo from "/a-logo.png";

const TransactionDashboard = () => {
  const userType = localStorage.getItem("userType") || "farmer";
  const userName = localStorage.getItem("userName") || "User";

  const farmerOrders = [
    {
      id: "ORD-001",
      counterparty: "Fresh Mart Jos",
      produce: "50kg Tomatoes",
      amount: 35000,
      status: "in-transit",
      date: "2024-10-15",
      delivery: "2024-10-18"
    },
    {
      id: "ORD-002",
      counterparty: "Super Foods Bauchi",
      produce: "30kg Carrots",
      amount: 18000,
      status: "delivered",
      date: "2024-10-10",
      delivery: "2024-10-12"
    },
    {
      id: "ORD-003",
      counterparty: "Local Market Azare",
      produce: "25kg Yellow Peppers",
      amount: 22500,
      status: "pending",
      date: "2024-10-16",
      delivery: "2024-10-20"
    },
  ];

  const buyerOrders = [
    {
      id: "ORD-004",
      counterparty: "Adamu Ibrahim",
      produce: "50kg Tomatoes",
      amount: 35000,
      status: "in-transit",
      date: "2024-10-14",
      delivery: "2024-10-17"
    },
    {
      id: "ORD-005",
      counterparty: "Fatima Ahmed",
      produce: "30kg Carrots",
      amount: 18000,
      status: "delivered",
      date: "2024-10-08",
      delivery: "2024-10-10"
    },
  ];

  const orders = userType === "farmer" ? farmerOrders : buyerOrders;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "delivered":
        return <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Delivered</Badge>;
      case "in-transit":
        return <Badge className="bg-blue-600"><Truck className="w-3 h-3 mr-1" />In Transit</Badge>;
      case "pending":
        return <Badge className="bg-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-600"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalEarnings = orders.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = orders.filter(o => o.status === "delivered").length;
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "in-transit").length;

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
              <Link to={userType === "farmer" ? "/dashboard" : "/buyer-dashboard"}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              {userType === "buyer" && (
                <Link to="/marketplace">
                  <Button variant="outline">Marketplace</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Transactions & Orders 📊</h1>
          <p className="text-muted-foreground text-lg">
            Track your {userType === "farmer" ? "sales" : "purchases"} and delivery status
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {userType === "farmer" ? "Total Earnings" : "Total Spent"}
                </p>
                <p className="text-2xl font-bold">₦{totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Orders</p>
                <p className="text-2xl font-bold">{completedOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending/In Transit</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b px-6 pt-6">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="p-6 space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{order.id}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-muted-foreground">
                        {userType === "farmer" ? `Buyer: ${order.counterparty}` : `Seller: ${order.counterparty}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ₦{order.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{order.produce}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium">{new Date(order.date).toLocaleDateString('en-NG')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {order.status === "delivered" ? "Delivered On" : "Expected Delivery"}
                      </p>
                      <p className="font-medium">{new Date(order.delivery).toLocaleDateString('en-NG')}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="pending" className="p-6 space-y-4">
              {orders.filter(o => o.status === "pending" || o.status === "in-transit").map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{order.id}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-muted-foreground">
                        {userType === "farmer" ? `Buyer: ${order.counterparty}` : `Seller: ${order.counterparty}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ₦{order.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{order.produce}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium">{new Date(order.date).toLocaleDateString('en-NG')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected Delivery</p>
                      <p className="font-medium">{new Date(order.delivery).toLocaleDateString('en-NG')}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="p-6 space-y-4">
              {orders.filter(o => o.status === "delivered").map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{order.id}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-muted-foreground">
                        {userType === "farmer" ? `Buyer: ${order.counterparty}` : `Seller: ${order.counterparty}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ₦{order.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{order.produce}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium">{new Date(order.date).toLocaleDateString('en-NG')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Delivered On</p>
                      <p className="font-medium">{new Date(order.delivery).toLocaleDateString('en-NG')}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default TransactionDashboard;
