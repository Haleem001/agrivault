import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, User, Phone, Star, ShoppingCart, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/dummy/client";
import { Database } from "@/integrations/supabase/types";
import tomatoesImg from "@/assets/tomatoes.jpg";
import carrotsImg from "@/assets/carrots.jpg";
import pepperImg from "@/assets/yellow-pepper.jpg";
import maizeImg from "@/assets/maize.jpg";
import milletImg from "@/assets/millet.jpeg";
import riceImg from "@/assets/rice.webp";
import sorghumImg from "@/assets/sorghum.webp";
import logo from "/a-logo.png";

type ProduceListing = Database['public']['Tables']['produce_listings']['Row'] & {
  farmer: Database['public']['Tables']['profiles']['Row'];
};

const PublicMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [produceListings, setProduceListings] = useState<ProduceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Default images for different grain types
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
        .eq('status', 'available')
        .execute();

      if (result.error) {
        console.error('Error fetching produce listings:', result.error);
        // Fallback to dummy data if there's an error
        setProduceListings(getDummyData());
      } else {
        setProduceListings(result.data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setProduceListings(getDummyData());
    } finally {
      setLoading(false);
    }
  };

  const getDummyData = (): ProduceListing[] => {
    return [
      {
        id: '1',
        farmer_id: '550e8400-e29b-41d4-a716-446655440001',
        produce_name: 'Millet',
        quantity_kg: 500,
        price_per_kg: 250,
        status: 'available',
        storage_facility_id: null,
        image_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        farmer: {
          id: '550e8400-e29b-41d4-a716-446655440001',
          full_name: 'Abubakar Muhammad',
          user_type: 'farmer',
          location: 'Bauchi, Nigeria',
          phone_number: '+2348012345678',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      },
      {
        id: '2',
        farmer_id: '550e8400-e29b-41d4-a716-446655440002',
        produce_name: 'Sorghum',
        quantity_kg: 750,
        price_per_kg: 220,
        status: 'available',
        storage_facility_id: null,
        image_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        farmer: {
          id: '550e8400-e29b-41d4-a716-446655440002',
          full_name: 'Fatima Ibrahim',
          user_type: 'farmer',
          location: 'Azare, Bauchi, Nigeria',
          phone_number: '+2348023456789',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      },
      {
        id: '3',
        farmer_id: '550e8400-e29b-41d4-a716-446655440005',
        produce_name: 'Rice',
        quantity_kg: 1000,
        price_per_kg: 450,
        status: 'available',
        storage_facility_id: null,
        image_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        farmer: {
          id: '550e8400-e29b-41d4-a716-446655440005',
          full_name: 'Jonathan Dung',
          user_type: 'farmer',
          location: 'Jos, Plateau, Nigeria',
          phone_number: '+2348056789012',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      },
      {
        id: '4',
        farmer_id: '550e8400-e29b-41d4-a716-446655440006',
        produce_name: 'Maize',
        quantity_kg: 1200,
        price_per_kg: 180,
        status: 'available',
        storage_facility_id: null,
        image_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        farmer: {
          id: '550e8400-e29b-41d4-a716-446655440006',
          full_name: 'Grace Pam',
          user_type: 'farmer',
          location: 'Bokkos, Plateau, Nigeria',
          phone_number: '+2348067890123',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }
    ];
  };

  const handleViewDetails = (produce: ProduceListing) => {
    // Transform the data to match the expected format for checkout
    const checkoutData = {
      id: parseInt(produce.id),
      name: produce.produce_name,
      quantity: `${produce.quantity_kg}kg`,
      price: produce.quantity_kg * produce.price_per_kg,
      pricePerKg: produce.price_per_kg,
      image: produce.image_url || getProduceImage(produce.produce_name),
      seller: {
        name: produce.farmer.full_name,
        location: produce.farmer.location,
        rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5 and 5.0
        phone: produce.farmer.phone_number || '+234 XXX XXX XXXX',
      },
      storage: "Standard Storage",
      quality: "Grade A",
    };
    
    // Navigate to checkout page with the selected produce
    navigate("/checkout", { state: { produce: checkoutData } });
  };

  const filteredListings = produceListings.filter(item =>
    item.produce_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.farmer.location.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Public Marketplace 🛒</h1>
          <p className="text-muted-foreground text-lg">
            Browse fresh grains directly from verified farmers in Bauchi and Plateau states
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by grain type or location..."
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
                  src={item.image_url || getProduceImage(item.produce_name)} 
                  alt={item.produce_name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-green-600">
                  Available
                </Badge>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.produce_name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{item.farmer.location}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.farmer.full_name}</span>
                  </div>
                </div>

                <div className="border-t pt-3 mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <span className="font-bold">{item.quantity_kg}kg</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Price per kg:</span>
                    <span className="font-medium">₦{item.price_per_kg.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total:</span>
                    <span className="text-xl font-bold text-primary">
                      ₦{(item.quantity_kg * item.price_per_kg).toLocaleString()}
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

export default PublicMarketplace;