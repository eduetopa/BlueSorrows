
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Layout>
      {/* Hero section - increased text size and no images */}
      <section className="relative bg-gradient-to-r from-accent to-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover stories that ignite desire and passion
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Read, write, and share sensual stories in our vibrant adult community. 
              Let your imagination run wild in a world of intimate encounters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg py-6 px-8">
                <Link to="/explore">Explore stories</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg py-6 px-8">
                Start writing
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 pointer-events-none"></div>
      </section>
    </Layout>
  );
}
