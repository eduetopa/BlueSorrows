
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, BookOpen, FileText } from 'lucide-react';

interface BookChapterProps {
  chapter: {
    id: string;
    title: string;
    isPremium: boolean;
    isPreview?: boolean;
  };
  userType: 'guest' | 'member' | 'premium';
}

export default function BookChapter({ chapter, userType }: BookChapterProps) {
  const isAccessible = 
    (userType === 'premium') || 
    (userType === 'member' && !chapter.isPremium) || 
    (userType === 'guest' && chapter.isPreview);

  return (
    <div className="border border-border p-4 rounded-md mb-3 flex justify-between items-center">
      <div>
        <h3 className="font-medium">{chapter.title}</h3>
        {chapter.isPremium && (
          <span className="text-xs inline-flex items-center text-primary gap-1 mt-1">
            <Lock className="h-3 w-3" /> Premium content
          </span>
        )}
        {chapter.isPreview && userType === 'guest' && (
          <span className="text-xs inline-flex items-center text-accent-foreground gap-1 mt-1">
            Preview available
          </span>
        )}
      </div>

      <Button 
        variant={isAccessible ? "default" : "outline"}
        disabled={!isAccessible}
        size="sm"
      >
        {isAccessible ? (
          <>
            <BookOpen className="h-4 w-4 mr-2" />
            Read
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            {userType === 'guest' ? 'Sign in to read' : 'Premium only'}
          </>
        )}
      </Button>
    </div>
  );
}
