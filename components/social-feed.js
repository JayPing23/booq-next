'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookCard } from '@/components/book-card'
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Star, 
  BookOpen,
  Clock,
  Users,
  Trophy
} from 'lucide-react'
import { cn } from '@/lib/utils'

const mockActivities = [
  {
    id: '1',
    type: 'finished_book',
    user: {
      name: 'Sarah Chen',
      username: 'sarahreads',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    book: {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
      rating: 4.6
    },
    rating: 5,
    review: "Absolutely brilliant insights on how our psychology affects our financial decisions. Clear writing and practical examples make this a must-read for anyone looking to understand money better.",
    timestamp: '2 hours ago',
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    type: 'started_reading',
    user: {
      name: 'Mike Rodriguez',
      username: 'mikethereader',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    book: {
      id: '2',
      title: 'Zero to One',
      author: 'Peter Thiel',
      cover: 'https://images.unsplash.com/photo-1619872553215-8ac017d003f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85'
    },
    timestamp: '4 hours ago',
    likes: 8,
    comments: 1
  },
  {
    id: '3',
    type: 'goal_milestone',
    user: {
      name: 'Emma Thompson',
      username: 'emmalovesbooks',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    milestone: '25 books read',
    goal: 50,
    timestamp: '6 hours ago',
    likes: 24,
    comments: 7
  },
  {
    id: '4',
    type: 'rated_book',
    user: {
      name: 'David Kim',
      username: 'davidreads',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    book: {
      id: '3',
      title: 'Milk and Honey',
      author: 'Rupi Kaur',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85'
    },
    rating: 4,
    timestamp: '8 hours ago',
    likes: 15,
    comments: 2
  },
  {
    id: '5',
    type: 'added_to_list',
    user: {
      name: 'Lisa Wang',
      username: 'lisareads',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    book: {
      id: '4',
      title: '12 Rules for Life',
      author: 'Jordan B. Peterson',
      cover: 'https://images.unsplash.com/photo-1597149305638-fef8c2b1981b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85'
    },
    listName: 'Psychology & Self-Help',
    timestamp: '1 day ago',
    likes: 6,
    comments: 0
  }
]

export function SocialFeed({ onBookSelect }) {
  const [likedActivities, setLikedActivities] = useState(new Set())

  const handleLike = (activityId) => {
    setLikedActivities(prev => {
      const newSet = new Set(prev)
      if (newSet.has(activityId)) {
        newSet.delete(activityId)
      } else {
        newSet.add(activityId)
      }
      return newSet
    })
  }

  const renderActivity = (activity) => {
    const isLiked = likedActivities.has(activity.id)

    const ActivityHeader = () => (
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
          <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{activity.user.name}</span>
            <span className="text-muted-foreground">@{activity.user.username}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            {activity.timestamp}
          </div>
        </div>
      </div>
    )

    const ActivityFooter = () => (
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLike(activity.id)}
            className={cn("gap-2", isLiked && "text-red-500")}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            {activity.likes + (isLiked ? 1 : 0)}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            {activity.comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share className="h-4 w-4" />
        </Button>
      </div>
    )

    switch (activity.type) {
      case 'finished_book':
        return (
          <Card key={activity.id} className="mb-6">
            <CardContent className="p-6">
              <ActivityHeader />
              
              <div className="flex items-start gap-4">
                <img
                  src={activity.book.cover}
                  alt={`${activity.book.title} cover`}
                  className="w-20 h-28 object-cover rounded cursor-pointer book-hover"
                  onClick={() => onBookSelect(activity.book)}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Finished reading</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < activity.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-muted-foreground/30"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <h3 
                    className="font-crimson text-lg font-semibold mb-1 cursor-pointer hover:text-primary"
                    onClick={() => onBookSelect(activity.book)}
                  >
                    {activity.book.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    by {activity.book.author}
                  </p>
                  
                  {activity.review && (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      "{activity.review}"
                    </blockquote>
                  )}
                </div>
              </div>
              
              <ActivityFooter />
            </CardContent>
          </Card>
        )

      case 'started_reading':
        return (
          <Card key={activity.id} className="mb-6">
            <CardContent className="p-6">
              <ActivityHeader />
              
              <div className="flex items-center gap-4">
                <img
                  src={activity.book.cover}
                  alt={`${activity.book.title} cover`}
                  className="w-16 h-22 object-cover rounded cursor-pointer book-hover"
                  onClick={() => onBookSelect(activity.book)}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Started reading</span>
                  </div>
                  
                  <h3 
                    className="font-crimson text-lg font-semibold cursor-pointer hover:text-primary"
                    onClick={() => onBookSelect(activity.book)}
                  >
                    {activity.book.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    by {activity.book.author}
                  </p>
                </div>
              </div>
              
              <ActivityFooter />
            </CardContent>
          </Card>
        )

      case 'goal_milestone':
        return (
          <Card key={activity.id} className="mb-6">
            <CardContent className="p-6">
              <ActivityHeader />
              
              <div className="flex items-center gap-4">
                <div className="p-4 bg-yellow-500/10 rounded-full">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Reached reading milestone!</span>
                  </div>
                  
                  <h3 className="font-crimson text-xl font-semibold mb-2">
                    {activity.milestone} 🎉
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Progress: {activity.milestone.split(' ')[0]}/{activity.goal} books
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2 max-w-32">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ 
                          width: `${(parseInt(activity.milestone.split(' ')[0]) / activity.goal) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <ActivityFooter />
            </CardContent>
          </Card>
        )

      case 'rated_book':
        return (
          <Card key={activity.id} className="mb-6">
            <CardContent className="p-6">
              <ActivityHeader />
              
              <div className="flex items-center gap-4">
                <img
                  src={activity.book.cover}
                  alt={`${activity.book.title} cover`}
                  className="w-16 h-22 object-cover rounded cursor-pointer book-hover"
                  onClick={() => onBookSelect(activity.book)}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">Rated</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < activity.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-muted-foreground/30"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <h3 
                    className="font-crimson text-lg font-semibold cursor-pointer hover:text-primary"
                    onClick={() => onBookSelect(activity.book)}
                  >
                    {activity.book.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    by {activity.book.author}
                  </p>
                </div>
              </div>
              
              <ActivityFooter />
            </CardContent>
          </Card>
        )

      case 'added_to_list':
        return (
          <Card key={activity.id} className="mb-6">
            <CardContent className="p-6">
              <ActivityHeader />
              
              <div className="flex items-center gap-4">
                <img
                  src={activity.book.cover}
                  alt={`${activity.book.title} cover`}
                  className="w-16 h-22 object-cover rounded cursor-pointer book-hover"
                  onClick={() => onBookSelect(activity.book)}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Added to</span>
                    <Badge variant="secondary">{activity.listName}</Badge>
                  </div>
                  
                  <h3 
                    className="font-crimson text-lg font-semibold cursor-pointer hover:text-primary"
                    onClick={() => onBookSelect(activity.book)}
                  >
                    {activity.book.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    by {activity.book.author}
                  </p>
                </div>
              </div>
              
              <ActivityFooter />
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-crimson text-2xl font-semibold">Your Reading Feed</h1>
              <p className="text-sm text-muted-foreground">
                See what your friends are reading and discover new books
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Users className="h-3 w-3" />
                156 friends
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {mockActivities.map(renderActivity)}
          
          {/* Load More */}
          <div className="text-center py-8">
            <Button variant="outline" className="gap-2">
              Load more activities
              <Clock className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}