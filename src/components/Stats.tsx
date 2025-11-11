const stats = [
  { value: "40%", label: "Post-Harvest Losses Reduced", icon: "📦" },
  { value: "5,000+", label: "Smallholder Farmers", icon: "🌾" },
  { value: "300+", label: "Verified Buyers", icon: "🏪" },
  { value: "25%", label: "Income Increase", icon: "💰" },
  { value: "50+", label: "Storage Facilities", icon: "🏭" },
  { value: "USSD", label: "Offline Access", icon: "📱" },
];

const Stats = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Transforming Nigerian Agriculture 🌟
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center animate-in fade-in zoom-in duration-500 hover:scale-105 transition-transform" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
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