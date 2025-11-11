import { Upload, Package, Handshake } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Register & List",
    description: "Create your account, list your produce, and choose from our network of trusted storage providers.",
    forRole: "Farmer",
  },
  {
    icon: Package,
    title: "Store & Track",
    description: "Store your produce in secure facilities with real-time monitoring and optional insurance coverage.",
    forRole: "Farmer",
  },
  {
    icon: Handshake,
    title: "Trade & Transact",
    description: "Connect with verified buyers, negotiate fair prices, and complete transparent transactions.",
    forRole: "Both",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How AgriVault Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to connect farmers with buyers and reduce post-harvest losses
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-border hidden md:block" 
                       style={{ 
                         transform: index === steps.length - 1 ? 'scale(0)' : 'translateX(50%)',
                       }} 
                  />
                  <div className="relative z-10 bg-background px-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-3">
                      {step.forRole}
                    </span>
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;