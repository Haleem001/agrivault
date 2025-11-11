import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, User, Phone, Star, ShoppingCart, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/dummy/client";
import tomatoesImg from "@/assets/tomatoes.jpg";
import carrotsImg from "@/assets/carrots.jpg";
import pepperImg from "@/assets/yellow-pepper.jpg";
import maizeImg from "@/assets/maize.jpg";
import milletImg from "@/assets/millet.jpeg";
import riceImg from "@/assets/rice.webp";
import sorghumImg from "@/assets/sorghum.webp";
import logo from "/a-logo.png";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [produceListings, setProduceListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Default images for different produce types
  const getProduceImage = (produceName: string) => {
    const name = produceName.toLowerCase();
    if (name.includes('millet')) return milletImg;
    if (name.includes('sorghum')) return sorghumImg;
    if (name.includes('rice')) return riceImg;
    if (name.includes('maize')) return maizeImg;
    if (name.includes('tomato')) return tomatoesImg;
    if (name.includes('carrot')) return carrotsImg;
    if (name.includes('pepper')) return pepperImg;
    return tomatoesImg; // default
  };

  useEffect(() => {
    fetchProduceListings();
  }, []);

  const fetchProduceListings = async () => {
    try {
      setLoading(true);
      const result = await supabase
        .from('produce_listings')
        .select(`
          *,
          farmer:profiles!produce_listings_farmer_id_fkey (
            full_name,
            location,
            phone_number
          )
        `)
        .eq('status', 'available');
      
      const { data, error } = result;

      if (error) {
        console.error('Error fetching produce listings:', error);
        // Fallback to dummy data if there's an error
        setProduceListings(getDummyData());
      } else {
        // Transform data to match expected format
        const transformedData = data.map((item: any) => ({
          id: parseInt(item.id),
          name: item.produce_name,
          quantity: `${item.quantity_kg}kg`,
          price: item.quantity_kg * item.price_per_kg,
          pricePerKg: item.price_per_kg,
          image: item.image_url || getProduceImage(item.produce_name),
          seller: {
            name: item.farmer?.full_name || 'Unknown Farmer',
            location: item.farmer?.location || 'Unknown Location',
            rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5 and 5.0
            totalSales: Math.floor(Math.random() * 100) + 10, // Random sales between 10 and 110
            phone: item.farmer?.phone_number || '+234 XXX XXX XXXX',
            memberSince: new Date(item.farmer?.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          },
          storage: "Climate-Controlled",
          quality: "Grade A",
          availableFrom: "Immediately"
        }));
        setProduceListings(transformedData);
      }
    } catch (error) {
      console.error('Error:', error);
      setProduceListings(getDummyData());
    } finally {
      setLoading(false);
    }
  };

  const getDummyData = () => {
    return [
      {
        id: 1,
        name: "Fresh Tomatoes",
        quantity: "50kg",
        price: 35000,
        pricePerKg: 700,
        image: tomatoesImg,
        seller: {
          name: "Adamu Ibrahim",
          location: "Bauchi State",
          rating: 4.8,
          totalSales: 45,
          phone: "+234 801 234 5678",
          memberSince: "Jan 2024"
        },
        storage: "Climate-Controlled",
        quality: "Grade A",
        availableFrom: "Immediately"
      },
      {
        id: 2,
        name: "Organic Carrots",
        quantity: "30kg",
        price: 18000,
        pricePerKg: 600,
        image: carrotsImg,
        seller: {
          name: "Fatima Ahmed",
          location: "Azare, Bauchi State",
          rating: 4.9,
          totalSales: 62,
          phone: "+234 802 345 6789",
          memberSince: "Dec 2023"
        },
        storage: "Cold Storage",
        quality: "Grade A",
        availableFrom: "Immediately"
      },
      {
        id: 3,
        name: "Yellow Peppers",
        quantity: "25kg",
        price: 22500,
        pricePerKg: 900,
        image: pepperImg,
        seller: {
          name: "Chinedu Okafor",
          location: "Jos, Plateau State",
          rating: 4.7,
          totalSales: 38,
          phone: "+234 803 456 7890",
          memberSince: "Mar 2024"
        },
        storage: "Climate-Controlled",
        quality: "Premium",
        availableFrom: "2 days"
      },
      {
        id: 4,
        name: "Fresh Tomatoes",
        quantity: "100kg",
        price: 68000,
        pricePerKg: 680,
        image: tomatoesImg,
        seller: {
          name: "Musa Bello",
          location: "Plateau State",
          rating: 4.6,
          totalSales: 29,
          phone: "+234 804 567 8901",
          memberSince: "Apr 2024"
        },
        storage: "Standard",
        quality: "Grade B",
        availableFrom: "1 week"
      },
      {
        id: 5,
        name: "Carrots Bundle",
        quantity: "50kg",
        price: 28000,
        pricePerKg: 560,
        image: carrotsImg,
        seller: {
          name: "Aisha Mohammed",
          location: "Bokkos, Plateau State",
          rating: 4.9,
          totalSales: 71,
          phone: "+234 805 678 9012",
          memberSince: "Nov 2023"
        },
        storage: "Cold Storage",
        quality: "Grade A",
        availableFrom: "Immediately"
      },
    ];
  };

  const handleViewDetails = (produce: any) => {
    // Navigate to checkout page with the selected produce
    navigate("/checkout", { state: { produce } });
  };

  const filteredListings = produceListings.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.seller.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading produce listings...</p>
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
              <img src={logo} alt="Agrivault Logo" className="w-10 h-10 rounded-lg" />
              <span className="text-2xl font-bold text-foreground">Agrivault</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/buyer-dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/transactions">
                <Button variant="outline">My Orders</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Marketplace 🛒</h1>
          <p className="text-muted-foreground text-lg">
            Browse fresh produce directly from verified farmers across Nigeria
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by produce name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredListings.length} available listings
        </p>

        {/* Produce Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-green-600">
                  {item.quality}
                </Badge>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{item.seller.location}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.seller.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({item.seller.totalSales} sales)
                  </span>
                </div>

                <div className="border-t pt-3 mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <span className="font-bold">{item.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Price per kg:</span>
                    <span className="font-medium">₦{item.pricePerKg.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total:</span>
                    <span className="text-xl font-bold text-primary">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleViewDetails(item)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No produce found matching your search
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
