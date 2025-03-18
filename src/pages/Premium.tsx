import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Heart, Shield, BookOpen, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
interface PlanFeature {
  name: string;
  included: boolean;
}
interface PricingPlan {
  name: string;
  price: number | "Free";
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
  color: string;
  icon: React.ReactNode;
}
export default function Premium() {
  const plans: PricingPlan[] = [{
    name: "Basic",
    price: "Free",
    description: "Perfect for casual readers exploring our community",
    color: "bg-card border-blue-200",
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    features: [{
      name: "Access to free stories",
      included: true
    }, {
      name: "Comment on stories",
      included: true
    }, {
      name: "Basic profile",
      included: true
    }, {
      name: "Follow authors",
      included: true
    }, {
      name: "Create reading lists",
      included: true
    }, {
      name: "Access to premium content",
      included: false
    }, {
      name: "Ad-free experience",
      included: false
    }, {
      name: "Early access to new features",
      included: false
    }]
  }, {
    name: "Passionate",
    price: 5,
    description: "For dedicated readers who want more intimate content",
    highlighted: true,
    color: "bg-gradient-to-b from-blue-500 to-primary shadow-lg border-blue-400",
    icon: <Heart className="h-8 w-8 text-white" />,
    features: [{
      name: "Access to free stories",
      included: true
    }, {
      name: "Comment on stories",
      included: true
    }, {
      name: "Enhanced profile",
      included: true
    }, {
      name: "Follow authors",
      included: true
    }, {
      name: "Create reading lists",
      included: true
    }, {
      name: "Access to premium content",
      included: true
    }, {
      name: "Ad-free experience",
      included: true
    }, {
      name: "Early access to new features",
      included: false
    }]
  }, {
    name: "Unlimited",
    price: 10,
    description: "Complete access to our most exclusive content",
    color: "bg-card border-blue-200",
    icon: <Crown className="h-8 w-8 text-blue-500" />,
    features: [{
      name: "Access to free stories",
      included: true
    }, {
      name: "Comment on stories",
      included: true
    }, {
      name: "Premium profile",
      included: true
    }, {
      name: "Follow authors",
      included: true
    }, {
      name: "Create reading lists",
      included: true
    }, {
      name: "Access to premium content",
      included: true
    }, {
      name: "Ad-free experience",
      included: true
    }, {
      name: "Early access to new features",
      included: true
    }]
  }];
  return <Layout>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-100 to-accent/30 py-[10px] bg-gray-950 rounded-none">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="h-10 w-14 mx-auto mb-6 text-blue-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Unlock Your Reading Experience</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 red">
            Choose the perfect membership to enhance your journey with Blue Sorrows
          </p>
        </div>
      </section>

      {/* Pricing plans */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => <div key={index} className={cn("rounded-2xl p-6 border transition-all duration-300 hover:scale-105", plan.highlighted ? `${plan.color} text-white` : `${plan.color} text-foreground`)}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="mb-4">{plan.icon}</div>
                    <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                    <p className={cn("text-sm mb-4", plan.highlighted ? "text-white/80" : "text-muted-foreground")}>
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-end mb-2">
                    <span className="text-3xl font-bold">
                      {plan.price === "Free" ? "Free" : `€${plan.price}`}
                    </span>
                    {plan.price !== "Free" && <span className={plan.highlighted ? "text-white/80 ml-2" : "text-muted-foreground ml-2"}>
                        /month
                      </span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center">
                      {feature.included ? <Check className={cn("h-5 w-5 mr-3 flex-shrink-0", plan.highlighted ? "text-white" : "text-blue-500")} /> : <div className="h-5 w-5 mr-3 flex-shrink-0" />}
                      <span className={cn("text-sm", feature.included ? plan.highlighted ? "text-white" : "text-foreground" : plan.highlighted ? "text-white/60" : "text-muted-foreground")}>
                        {feature.name}
                      </span>
                    </li>)}
                </ul>

                <Button className={cn("w-full", plan.highlighted ? "bg-white text-blue-600 hover:bg-white/90" : "bg-blue-500 text-white hover:bg-blue-600")}>
                  {plan.price === "Free" ? "Get Started" : "Subscribe Now"}
                </Button>
              </div>)}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-gradient-to-b from-background to-blue-50/30">
        <div className="container mx-auto px-4 text-center">
          <Star className="h-12 w-12 mx-auto mb-6 text-blue-500" />
          <h2 className="text-3xl font-bold mb-8">What Our Members Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-xl shadow-md border border-blue-100">
              <p className="italic mb-4 text-muted-foreground">
                "The premium content is absolutely worth every penny. I've discovered authors and stories I would have never found otherwise."
              </p>
              <p className="font-semibold">Emma W.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-md border border-blue-100">
              <p className="italic mb-4 text-muted-foreground">
                "Blue Sorrows has become my daily escape. The ad-free experience with the Passionate plan makes reading so much more immersive."
              </p>
              <p className="font-semibold">James K.</p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-md border border-blue-100">
              <p className="italic mb-4 text-muted-foreground">
                "From a free user to Unlimited member, I can say the premium features have transformed how I enjoy stories. Highly recommended!"
              </p>
              <p className="font-semibold">Sofia M.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-blue-100 rounded-lg p-6 bg-background">
              <h3 className="text-lg font-semibold mb-2">Can I switch between plans?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your subscription at any time. Changes will take effect at the start of your next billing cycle.</p>
            </div>
            
            <div className="border border-blue-100 rounded-lg p-6 bg-background">
              <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">We offer a 7-day money-back guarantee if you're not satisfied with your premium subscription.</p>
            </div>
            
            <div className="border border-blue-100 rounded-lg p-6 bg-background">
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and select regional payment methods.</p>
            </div>
            
            <div className="border border-blue-100 rounded-lg p-6 bg-background">
              <h3 className="text-lg font-semibold mb-2">How do I cancel my subscription?</h3>
              <p className="text-muted-foreground">You can cancel your subscription at any time through your account settings. You'll continue to have access until the end of your current billing period.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500/80 to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Experience?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/80">
            Join thousands of readers who have already upgraded to premium. Start enjoying exclusive content today.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 px-8">
            Get Started
          </Button>
        </div>
      </section>
    </Layout>;
}