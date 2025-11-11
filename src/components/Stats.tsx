import { Package, TrendingUp,  Smartphone } from "lucide-react";

const stats = [
  { value: "40%", label: "Post-Harvest Losses Reduced", icon: Package },
  { value: "25%", label: "Income Increase", icon: TrendingUp },
  { value: "USSD", label: "Offline Access", icon: Smartphone },
];

const Stats = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Transforming Nigerian Agriculture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center animate-in fade-in zoom-in duration-500 hover:scale-105 transition-transform" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center text-center mb-2">
                <stat.icon size={32} />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;