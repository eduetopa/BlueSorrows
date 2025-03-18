
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, Eye, BookOpen } from "lucide-react";

export interface StoryData {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  tags: string[];
  isPremium: boolean;
  likes: number;
  views: number;
  chapters: number;
  status: "completed" | "ongoing" | "paused";
}

interface StoryCardProps {
  story: StoryData;
  featured?: boolean;
}

export default function StoryCard({ story, featured = false }: StoryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "ongoing": return "bg-blue-500";
      case "paused": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "ongoing": return "Ongoing";
      case "paused": return "Paused";
      default: return status;
    }
  };

  return (
    <Link to={`/story/${story.id}`}>
      <div className={`story-card ${featured ? 'col-span-2 md:flex' : ''}`}>
        <div className={`relative ${featured ? 'w-full md:w-1/3 aspect-[2/3]' : 'aspect-[2/3]'}`}>
          <img 
            src={story.coverImage} 
            alt={story.title} 
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
          {story.isPremium && (
            <div className="premium-badge">
              Premium
            </div>
          )}
        </div>
        <div className={`p-4 ${featured ? 'md:w-2/3' : ''}`}>
          <h3 className={`font-bold mb-1 ${featured ? 'text-xl' : 'text-lg'} line-clamp-2`}>{story.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">By {story.author}</p>
          
          {featured && (
            <p className="text-sm text-foreground/80 line-clamp-3 mb-3">{story.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-3">
            {story.tags.slice(0, featured ? 3 : 2).map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground gap-3 mb-2">
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {story.likes}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {story.views}
            </span>
            <span className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              {story.chapters} ch
            </span>
          </div>
          
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(story.status)}`}>
              {getStatusText(story.status)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
