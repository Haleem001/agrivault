import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Target, Gift, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import unhappyFarmer from "@/assets/unhappy-farmer-spoiled.jpg";
import happyFarmer from "@/assets/happy-farmer-success.jpg";
import handshakeDeal from "@/assets/handshake-deal.jpg";
import logo from "/a-logo.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Agrivault Logo" className="w-10 h-10 rounded-lg" />
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              About Agrivault
            </h1>
            <p className="text-xl text-muted-foreground">
              An e-commerce marketplace for Nigerian smallholder farmers and agro buyers
            </p>
          </div>

          {/* The Journey: From Problem to Solution */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-left duration-700">
              <img src={unhappyFarmer} alt="Nigerian farmer worried about spoiled produce" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">The Problem</h3>
                <p className="text-muted-foreground">Nigerian farmers lose up to 40% of their harvest to spoilage due to lack of proper storage</p>
              </div>
            </Card>
            
            <Card className="rounded-xl overflow-hidden shadow-lg animate-in fade-in zoom-in duration-700 delay-100">
              <img src={happyFarmer} alt="Happy Nigerian farmer with fresh produce" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">The Solution</h3>
                <p className="text-muted-foreground">Climate-controlled storage keeps produce fresh for weeks, maximizing quality and value</p>
              </div>
            </Card>
            
            <Card className="rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-right duration-700 delay-200">
              <img src={handshakeDeal} alt="Farmer and buyer making a deal" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">The Connection</h3>
                <p className="text-muted-foreground">Direct access to verified buyers means fair prices and faster sales for farmers</p>
              </div>
            </Card>
          </div>

          {/* What Agrivault Does */}
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">What We Do</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Agrivault is an e-commerce marketplace designed for Nigerian smallholder farmers and agro buyers
              to address challenges of limited market access, unfair pricing, and post-harvest losses.
              The platform connects farmers directly with verified buyers and trusted storage providers,
              combining digital trade with integrated storage and logistics services. Through web, mobile, and
              USSD/SMS access, it enables transparent pricing, efficient transactions, and offline inclusivity.
              The MVP features marketplace listings, seller onboarding, transaction tracking, and optional storage.
            </p>
          </div>

          {/* Mission, Vision, Offer, Promise */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower Nigerian smallholder farmers with direct market access and fair pricing,
                reducing post-harvest losses and increasing agricultural income through digital innovation.
              </p>
            </div>

            {/* What We Offer */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Gift className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">What We Offer</h3>
              <p className="text-muted-foreground leading-relaxed">
                Digital marketplace listings, direct buyer connections, trusted storage providers,
                transaction tracking, USSD/SMS accessibility, transparent pricing, and integrated logistics.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become Nigeria's leading agricultural e-commerce platform, transforming how farmers
                access markets and sell their produce while building a sustainable and inclusive farming ecosystem.
              </p>
            </div>

            {/* Promise */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Promise</h3>
              <p className="text-muted-foreground leading-relaxed">
                We promise transparent pricing, direct buyer connections, reduced post-harvest losses,
                fair market access, and inclusive technology that works for all farmers, regardless of connectivity.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <Link to="/auth">
              <Button size="lg" className="text-lg">
                Get Started - Join Agrivault
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
