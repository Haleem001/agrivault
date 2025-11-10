import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import AboutUs from "./pages/AboutUs";
import FarmersDashboard from "./pages/FarmersDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import BookStorage from "./pages/BookStorage";
import SellProduce from "./pages/SellProduce";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import PublicMarketplace from "./pages/PublicMarketplace";
import TransactionDashboard from "./pages/TransactionDashboard";
import Subscription from "./pages/Subscription";
import StorageFacilities from "./pages/StorageFacilities";
import UssdSimulation from "./pages/UssdSimulation";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OfflineIndicator />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/dashboard" element={<FarmersDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/book-storage" element={<BookStorage />} />
          <Route path="/sell-produce" element={<SellProduce />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/public-marketplace" element={<PublicMarketplace />} />
          <Route path="/transactions" element={<TransactionDashboard />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/storage-facilities" element={<StorageFacilities />} />
          <Route path="/ussd-simulation" element={<UssdSimulation />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
