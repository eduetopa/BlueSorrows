
import { useState } from "react";
import Layout from "@/components/Layout";
import StoryCard from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search, Filter, ChevronRight, Sparkles, Heart, Flame, Compass, TrendingUp, BookOpen } from "lucide-react";
import { mockStories, genres } from "@/data/mockStories";
import { Link } from "react-router-dom";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter stories based on search, genre, and status
  const filteredStories = mockStories.filter(story => {
    const matchesSearch = searchQuery === "" || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      story.author.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesGenre = selectedGenre === null || 
      story.tags.some(tag => tag.toLowerCase() === selectedGenre.toLowerCase());
      
    const matchesStatus = selectedStatus === null || 
      story.status === selectedStatus;
      
    return matchesSearch && matchesGenre && matchesStatus;
  });
  
  const trendingStories = mockStories.slice(0, 6);
  const newStories = [...mockStories].sort(() => Math.random() - 0.5).slice(0, 8);
  
  const handleSearch = () => {
    // Search functionality is already implemented with the filter above
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <Layout>
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-blue-100/50 to-accent/30 py-10">
        <div className="container mx-auto px-4 text-center">
          <Compass className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <h1 className="text-4xl font-bold mb-3">Explore Sensual Stories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover captivating stories that stir your emotions and ignite your imagination
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and filter */}
        <div className="bg-card rounded-xl shadow-md p-6 mb-10 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Search className="h-5 w-5 mr-2 text-blue-500" />
            Find Your Perfect Story
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stories or authors..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Search
              </Button>
            </div>
            
            <div className="flex gap-3 flex-wrap md:flex-nowrap">
              <Select onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Genre</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Trending stories */}
        <section className="py-8">
          <div className="bg-gradient-to-r from-blue-100/20 to-background rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-blue-500" />
                Trending Now
              </h2>
              <Link to="/trending" className="text-blue-500 flex items-center text-sm hover:underline group">
                See more <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Premium section */}
        <section className="py-8">
          <div className="bg-gradient-to-r from-blue-500/60 to-accent/80 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="text-white mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <Sparkles className="h-6 w-6 mr-2" />
                Exclusive Premium Content
              </h2>
              <p className="text-white/90 mb-4 max-w-lg">
                Unlock our most intimate and provocative stories with a premium membership. Experience storytelling without boundaries.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-blue-600 font-medium"
                asChild
              >
                <Link to="/premium">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Explore Premium
                </Link>
              </Button> 
            </div>
            <div className="relative w-full md:w-1/4 max-w-xs">
              <div className="aspect-[2/3] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874" 
                  alt="Premium book" 
                  className="relative rounded-lg shadow-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute top-2 right-2 bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
                  Premium
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Browse by genre */}
        <section className="py-8">
          <div className="bg-card rounded-xl shadow-md p-6 border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-blue-500" />
              Explore by Genre
            </h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {genres.map(genre => (
                  <Button 
                    key={genre} 
                    variant="outline"
                    className="flex-shrink-0 hover:bg-blue-500 hover:text-primary-foreground transition-colors border-blue-200"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </section>
        
        {/* New stories */}
        <section className="py-8">
          <div className="bg-gradient-to-t from-blue-100/20 to-background rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Flame className="h-6 w-6 mr-2 text-blue-500" />
                Fresh & Hot
              </h2>
              <Tabs defaultValue="all" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="free">Free</TabsTrigger>
                  <TabsTrigger value="premium">Premium</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {newStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                size="lg" 
                className="hover:bg-blue-500 hover:text-primary-foreground transition-colors border-blue-200"
              >
                Load more
              </Button>
            </div>
          </div>
        </section>
        
        {/* Join community section */}
        <section className="py-16 my-8 bg-gradient-to-r from-blue-100/30 to-background/50 rounded-xl">
          <div className="container mx-auto px-4 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">Join our passionate community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with writers and readers who share your passion for sensual stories. 
              Start reading, writing, and engaging today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 bg-blue-500 hover:bg-blue-600">
                <Link to="/signup">Sign up</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 hover:bg-blue-100 border-blue-200 text-blue-700">
                Learn more
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
