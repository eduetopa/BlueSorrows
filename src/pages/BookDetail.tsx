
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import BookChapter from '@/components/BookChapter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, Heart, BookOpen, FileText, Star, Eye } from 'lucide-react';
import { mockStories } from '@/data/mockStories';

// Mock chapters data
const mockChapters = [
  { id: '1', title: 'Chapter 1: The Beginning', isPremium: false, isPreview: true },
  { id: '2', title: 'Chapter 2: Unexpected Encounters', isPremium: false },
  { id: '3', title: 'Chapter 3: Tension Rises', isPremium: false },
  { id: '4', title: 'Chapter 4: The Revelation', isPremium: false },
  { id: '5', title: 'Chapter 5: Passionate Night', isPremium: true },
  { id: '6', title: 'Bonus: Author\'s Personal Experience', isPremium: true },
];

// Mock author data
const authorData = {
  id: '1',
  name: 'Elena Blackwood',
  bio: 'New York Times bestselling author of romantic fiction with a passionate twist. Writing steamy stories for over a decade.',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  stories: 24,
  followers: 12800
};

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [userType, setUserType] = useState<'guest' | 'member' | 'premium'>('guest');
  
  // Find the story from the mock data
  const story = mockStories.find(s => s.id === id) || mockStories[0];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Book cover */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={story.coverImage} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                {story.isPremium && (
                  <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Premium
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button className="flex-1">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              {/* User type toggle - only for demo purposes */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Simulation controls:</p>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant={userType === 'guest' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setUserType('guest')}
                  >
                    View as guest
                  </Button>
                  <Button 
                    variant={userType === 'member' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setUserType('member')}
                  >
                    View as member
                  </Button>
                  <Button 
                    variant={userType === 'premium' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setUserType('premium')}
                  >
                    View as premium
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Content */}
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{story.title}</h1>
            
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              {story.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center">
                <Heart className="h-4 w-4 mr-1" /> {story.likes.toLocaleString()}
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" /> {story.views.toLocaleString()}
              </span>
              <span className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" /> {story.chapters} chapters
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs text-white 
                ${story.status === 'completed' ? 'bg-green-500' : 
                  story.status === 'ongoing' ? 'bg-blue-500' : 'bg-amber-500'}`}>
                {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
              </span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-lg mb-4">{story.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare, felis sed tincidunt consectetur, risus quam 
                volutpat quam, eget pretium velit ligula a dolor. Nullam rhoncus laoreet sodales. Integer at nisl vel ligula 
                efficitur ornare. Maecenas mattis enim odio, quis hendrerit mi interdum eu. Suspendisse non felis elit.
              </p>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam odio arcu, 
                vestibulum sit amet mi et, elementum convallis nulla. Ut pretium nisi ipsum, at tempus lorem rutrum eu.
              </p>
            </div>
            
            {/* Author information */}
            <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg mb-8">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={authorData.image} 
                  alt={authorData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{authorData.name}</p>
                <p className="text-sm text-muted-foreground">{authorData.stories} stories · {authorData.followers.toLocaleString()} followers</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Follow
              </Button>
            </div>
            
            <Tabs defaultValue="chapters">
              <TabsList className="mb-4">
                <TabsTrigger value="chapters">Chapters</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                {userType === 'premium' && (
                  <TabsTrigger value="extras">
                    <FileText className="h-4 w-4 mr-2" />
                    Bonus Content
                  </TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="chapters" className="space-y-3">
                <h2 className="text-xl font-bold mb-4">Chapters</h2>
                
                {userType === 'guest' && (
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="text-sm">
                      <strong>Guest preview:</strong> You can read the first chapter for free.
                      <Button variant="link" className="px-0 py-0 h-auto">Sign in</Button> to read more.
                    </p>
                  </div>
                )}
                
                {mockChapters.map(chapter => (
                  <BookChapter 
                    key={chapter.id} 
                    chapter={chapter} 
                    userType={userType} 
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="reviews">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(num => (
                      <Star 
                        key={num} 
                        className={`h-6 w-6 ${num <= 4 ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">4.0</span>
                  <span className="text-sm text-muted-foreground">(128 reviews)</span>
                </div>
                
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    {userType === 'guest' 
                      ? 'Sign in to see reviews from our community'
                      : 'No reviews yet. Be the first to leave one!'}
                  </p>
                </div>
              </TabsContent>
              
              {userType === 'premium' && (
                <TabsContent value="extras">
                  <h2 className="text-xl font-bold mb-4">Premium Bonus Content</h2>
                  <div className="space-y-4">
                    <div className="border border-border p-4 rounded-md">
                      <h3 className="font-medium mb-2">Author's Notes</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Exclusive insights into my writing process and inspiration behind this story.
                      </p>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" /> Read Notes
                      </Button>
                    </div>
                    
                    <div className="border border-border p-4 rounded-md">
                      <h3 className="font-medium mb-2">Alternative Ending</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Experience a different conclusion to this passionate tale.
                      </p>
                      <Button size="sm">
                        <BookOpen className="h-4 w-4 mr-2" /> Read Alternate Ending
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
