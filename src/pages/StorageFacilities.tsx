import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Package, CheckCircle, Clock } from "lucide-react";

const StorageFacilities = () => {
  const facilities = [
    {
      id: 4,
      name: "Plateau Fresh Storage",
      location: "Plateau State",
      type: "Climate-Controlled",
      capacity: "350 tons",
      available: "200 tons",
      temperature: "12-18°C",
      status: "available",
      distance: "3.1 km"
    }
  ];

  const myStorage = [
    {
      facility: "Plateau Fresh Storage",
      produce: "30kg Carrots",
      stored: "Oct 20, 2024",
      duration: "3 weeks",
      status: "Fresh",
      expires: "Nov 10, 2024"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "available":
        return <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Available</Badge>;
      case "limited":
        return <Badge className="bg-yellow-600"><Clock className="w-3 h-3 mr-1" />Limited Space</Badge>;
      case "full":
        return <Badge className="bg-red-600">Full</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Agrivault</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/book-storage">
                <Button variant="outline">Book Storage</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Storage Facilities 🏭</h1>
          <p className="text-muted-foreground text-lg">
            View available storage facilities and manage your stored produce
          </p>
        </div>

        {/* My Current Storage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">My Current Storage</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {myStorage.map((item, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-green-50 to-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.produce}</h3>
                    <p className="text-sm text-muted-foreground">{item.facility}</p>
                  </div>
                  <Badge className="bg-green-600">{item.status}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stored Since:</span>
                    <span className="font-medium">{item.stored}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{item.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage Expires:</span>
                    <span className="font-medium">{item.expires}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Extend Storage
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Facilities */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Facilities Near You</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {facilities.map((facility) => (
              <Card key={facility.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                      <span className="text-primary">• {facility.distance}</span>
                    </div>
                    <Badge variant="secondary">{facility.type}</Badge>
                  </div>
                  {getStatusBadge(facility.status)}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-medium">{facility.temperature}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-medium">
                        {facility.available} available of {facility.capacity}
                      </p>
                      <div className="w-full bg-muted h-2 rounded-full mt-1">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ 
                            width: `${(parseInt(facility.available) / parseInt(facility.capacity)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/book-storage">
                  <Button className="w-full">
                    Book This Facility
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <h3 className="text-xl font-bold mb-3">Why Choose Agrivault Storage?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🌡️</div>
              <h4 className="font-bold mb-1">Climate Controlled</h4>
              <p className="text-sm text-muted-foreground">
                Maintain optimal conditions for your produce with our advanced climate control systems
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-bold mb-1">24/7 Security</h4>
              <p className="text-sm text-muted-foreground">
                Round-the-clock surveillance and security to keep your harvest safe
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-bold mb-1">Real-time Monitoring</h4>
              <p className="text-sm text-muted-foreground">
                Track your produce status and receive alerts via SMS and app notifications
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default StorageFacilities;
