import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";

type MenuState = 'main' | 'check-storage' | 'list-produce' | 'view-orders' | 'subscription';

const UssdSimulation = () => {
  const [currentMenu, setCurrentMenu] = useState<MenuState>('main');
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [sessionActive, setSessionActive] = useState(false);

  const startSession = () => {
    setSessionActive(true);
    setCurrentMenu('main');
    setOutput([
      "Welcome to Agrivault",
      "1. Check Storage Status",
      "2. List Produce",
      "3. View Orders",
      "4. Subscription Info",
      "0. Exit"
    ]);
  };

  const handleInput = (value: string) => {
    if (!sessionActive) return;

    const choice = value.trim();
    
    switch(currentMenu) {
      case 'main':
        handleMainMenu(choice);
        break;
      case 'check-storage':
        handleStorageMenu(choice);
        break;
      case 'list-produce':
        handleListProduceMenu(choice);
        break;
      case 'view-orders':
        handleOrdersMenu(choice);
        break;
      case 'subscription':
        handleSubscriptionMenu(choice);
        break;
    }
    
    setInput("");
  };

  const handleMainMenu = (choice: string) => {
    switch(choice) {
      case '1':
        setCurrentMenu('check-storage');
        setOutput([
          "Storage Status:",
          "Location: Jos Cold Storage",
          "Produce: 50kg Tomatoes",
          "Status: FRESH",
          "Duration: 2 weeks",
          "",
          "0. Back to Main Menu"
        ]);
        break;
      case '2':
        setCurrentMenu('list-produce');
        setOutput([
          "List Your Produce:",
          "Send SMS to 08012345678",
          "Format: LIST <name> <kg> <price>",
          "Example: LIST Tomatoes 100 500",
          "",
          "0. Back to Main Menu"
        ]);
        break;
      case '3':
        setCurrentMenu('view-orders');
        setOutput([
          "Recent Orders:",
          "Order #1234",
          "50kg Tomatoes",
          "Status: Delivered",
          "Amount: ₦25,000",
          "",
          "0. Back to Main Menu"
        ]);
        break;
      case '4':
        setCurrentMenu('subscription');
        setOutput([
          "Your Subscription:",
          "Plan: Basic (₦2,500/month)",
          "Status: Active",
          "Listings: 3/5 used",
          "",
          "0. Back to Main Menu"
        ]);
        break;
      case '0':
        endSession();
        break;
      default:
        setOutput([
          "Invalid option",
          "",
          "1. Check Storage Status",
          "2. List Produce",
          "3. View Orders",
          "4. Subscription Info",
          "0. Exit"
        ]);
    }
  };

  const handleStorageMenu = (choice: string) => {
    if (choice === '0') {
      setCurrentMenu('main');
      startSession();
    }
  };

  const handleListProduceMenu = (choice: string) => {
    if (choice === '0') {
      setCurrentMenu('main');
      startSession();
    }
  };

  const handleOrdersMenu = (choice: string) => {
    if (choice === '0') {
      setCurrentMenu('main');
      startSession();
    }
  };

  const handleSubscriptionMenu = (choice: string) => {
    if (choice === '0') {
      setCurrentMenu('main');
      startSession();
    }
  };

  const endSession = () => {
    setSessionActive(false);
    setOutput(["Session ended. Thank you for using Agrivault!"]);
    setCurrentMenu('main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Agrivault</span>
            </Link>
            
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <Phone className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">USSD/SMS Simulation</h1>
            <p className="text-muted-foreground">Experience Agrivault without a smartphone</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Phone Simulator */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Feature Phone Interface</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Dial *123# or send SMS to access Agrivault services
              </p>

              {/* Mock Phone Display */}
              <div className="bg-black rounded-3xl p-4 mb-4">
                <div className="bg-green-900 text-green-300 rounded-lg p-4 font-mono text-xs min-h-[300px]">
                  {output.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {!sessionActive ? (
                  <Button 
                    onClick={startSession} 
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Dial *123# to Start
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter option number"
                      className="flex-1"
                      maxLength={2}
                    />
                    <Button 
                      onClick={() => handleInput(input)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* SMS Interface */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">SMS Commands</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Send SMS to: <span className="font-bold">08012345678</span>
              </p>

              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold text-sm mb-2">Check Storage</h3>
                  <code className="text-xs">STATUS</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your current storage status
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold text-sm mb-2">List Produce</h3>
                  <code className="text-xs">LIST &lt;name&gt; &lt;kg&gt; &lt;price&gt;</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Example: LIST Tomatoes 100 500
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold text-sm mb-2">View Orders</h3>
                  <code className="text-xs">ORDERS</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check your recent orders
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold text-sm mb-2">Book Storage</h3>
                  <code className="text-xs">STORE &lt;name&gt; &lt;kg&gt; &lt;location&gt;</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Example: STORE Tomatoes 50 Jos
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold text-sm mb-2">Help</h3>
                  <code className="text-xs">HELP</code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get list of all commands
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-green-50 border-green-200">
            <h3 className="text-xl font-bold mb-3">Why USSD/SMS?</h3>
            <p className="text-muted-foreground mb-3">
              Not all farmers have smartphones or reliable internet access. Our USSD and SMS interfaces ensure that 
              every farmer can access Agrivault's services using basic feature phones.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Works on any mobile phone</li>
              <li>• No internet connection required</li>
              <li>• Simple menu-driven interface</li>
              <li>• Instant SMS confirmations</li>
              <li>• Accessible in rural areas</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UssdSimulation;
