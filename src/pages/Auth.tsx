import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Lock, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/dummy/client";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailField, setShowEmailField] = useState(false);
  const [userType, setUserType] = useState<"farmer" | "buyer">("farmer");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For this demo, we'll use email as username since Supabase requires email
    // In production, you'd need a custom auth flow or use phone as email format
    const authEmail = email || `${phone}@agrivault.app`;
    
    try {
      if (isLogin) {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password,
        });

        if (error) {
          // Provide more helpful error messages
          if (error.message.includes("Invalid login credentials")) {
            throw new Error("Invalid phone number or password. Try: +2348012345678 with password 'password123'");
          }
          throw error;
        }

        toast({
          title: "Welcome back! 👋",
          description: "Successfully logged in",
        });

        // Navigate based on user type from auth user metadata
        const userType = data.user.user_type || (data.user as any).user_type || 'farmer';
        if (userType === "farmer") {
          navigate("/dashboard");
        } else if (userType === "buyer") {
          navigate("/buyer-dashboard");
        } else {
          // Default to farmer dashboard if user_type is missing
          navigate("/dashboard");
        }
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password,
          options: {
            data: {
              full_name: name,
              user_type: userType,
              phone_number: phone,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        toast({
          title: "Account created! 🎉",
          description: "Welcome to Agrivault",
        });

        // Navigate based on user type
        if (userType === "farmer") {
          navigate("/dashboard");
        } else {
          navigate("/buyer-dashboard");
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Link to="/onboarding" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <Card className="p-6 md:p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome Back! 👋" : "Join Agrivault 🌾"}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {isLogin ? "Enter your details to continue" : "Create your account to get started"}
            </p>
          </div>

          {/* User Type Selection - Only for signup */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-base font-medium text-foreground mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("farmer")}
                  className={`p-5 rounded-lg border-2 transition-all ${
                    userType === "farmer"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-3xl mb-2">🌾</div>
                  <div className="font-semibold text-base">Farmer</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("buyer")}
                  className={`p-5 rounded-lg border-2 transition-all ${
                    userType === "buyer"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-3xl mb-2">🏪</div>
                  <div className="font-semibold text-base">Buyer</div>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name - Only for signup */}
            {!isLogin && (
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base flex items-center gap-2">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 text-base"
                  required
                />
              </div>
            )}

            {/* Phone Number - Primary field */}
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-base flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 XXX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-14 text-base"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-base flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 text-base"
                required
              />
            </div>

            {/* Optional Email Field */}
            <div>
              <button
                type="button"
                onClick={() => setShowEmailField(!showEmailField)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2"
              >
                <Mail className="w-4 h-4" />
                Add email address (optional)
                {showEmailField ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showEmailField && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top duration-300">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email helps with account recovery and notifications
                  </p>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6 h-14" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setShowEmailField(false);
              }}
              className="text-base text-primary hover:text-primary/80 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </Card>
        
        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-center text-muted-foreground mb-3">
            💡 <span className="font-medium">Demo Login Credentials</span>
          </p>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-primary mb-1">🌾 Farmer Accounts:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Phone: +2348034567890 | Password: password123 (Musa Abdullahi)</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-semibold text-primary mb-1">🏪 Buyer Accounts:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Phone: +2348090123456 | Password: password123 (Ahmed Yussuf)</p>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground mt-3">
            💡 <span className="font-medium">Works offline!</span> Save bookings and listings without internet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
