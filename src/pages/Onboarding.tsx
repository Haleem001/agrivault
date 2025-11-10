import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import onboardingHero from "@/assets/onboarding-hero.jpg";
import { Check } from "lucide-react";

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={onboardingHero} 
            alt="Modern farm storage facility" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom duration-700">
            Don't Let Your Harvest Go to Waste
          </h1>
          
          <p className="text-2xl md:text-3xl text-green-100 mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            Store Smart, Sell Faster, Earn More
          </p>

          <div className="flex flex-wrap gap-6 justify-center mb-12 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-lg">Climate-Controlled Storage</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-lg">Direct Buyer Access</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-lg">Secure Payments</span>
            </div>
          </div>

          <Link to="/auth">
            <Button size="lg" className="text-xl px-12 py-8 bg-green-600 hover:bg-green-700 animate-in fade-in zoom-in duration-700 delay-300">
              Get Started
            </Button>
          </Link>

          <p className="text-white/80 mt-6 text-lg">
            Join thousands of Nigerian farmers already using Agrivault
          </p>
        </div>
      </section>
    </div>
  );
};

export default Onboarding;
