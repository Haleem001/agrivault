import { Warehouse, TrendingUp, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Warehouse,
    title: "Integrated Storage",
    description: "Trusted storage providers with climate-controlled facilities to reduce post-harvest losses.",
  },
  {
    icon: TrendingUp,
    title: "Direct Marketplace",
    description: "Connect Nigerian farmers directly with verified buyers for fair pricing and transparent transactions.",
  },
  {
    icon: Shield,
    title: "Verified Network",
    description: "All buyers and storage providers are thoroughly vetted to ensure trust and reliability.",
  },
  {
    icon: Clock,
    title: "Multi-Platform Access",
    description: "Access the platform through web, mobile app, or USSD/SMS for inclusive reach.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Empowering Nigerian Agriculture
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Addressing limited market access, unfair pricing, and post-harvest losses for smallholder farmers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;