import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Nigerian Agriculture?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join our platform connecting smallholder farmers with verified buyers for fair pricing, reduced losses, and increased income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" variant="secondary" className="text-lg group">
                Join AgriVault Today
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about-us">
              <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;