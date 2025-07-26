'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Star, 
  Heart, 
  BookMarked, 
  Share, 
  Users, 
  Calendar,
  BookOpen,
  MessageCircle,
  Plus,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'

const mockFriendActivity = [
  {
    user: {
      name: 'Sarah Chen',
      username: 'sarahreads',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    review: "Absolutely brilliant insights on how our psychology affects our financial decisions.",
    date: '2024-06-10',
    status: 'finished'
  },
  {
    user: {
      name: 'Mike Rodriguez',
      username: 'mikethereader',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4,
    date: '2024-06-08',
    status: 'currently_reading'
  },
  {
    user: {
      name: 'Emma Thompson',
      username: 'emmalovesbooks',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    date: '2024-06-05',
    status: 'want_to_read'
  }
]

const mockReviews = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      username: 'sarahreads',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    review: "Absolutely brilliant insights on how our psychology affects our financial decisions. Morgan Housel's writing is clear and accessible, making complex financial concepts easy to understand. The stories and examples he uses are compelling and memorable. This book completely changed how I think about money and investing.",
    date: '2024-06-10',
    likes: 24,
    helpful: 18
  },
  {
    id: '2',
    user: {
      name: 'David Kim',
      username: 'davidreads',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    rating: 4,
    review: "Great book with practical advice about money management. Some concepts are repeated, but overall very insightful. The historical examples really help illustrate the points.",
    date: '2024-06-08',
    likes: 15,
    helpful: 12
  },
  {
    id: '3',
    user: {
      name: 'Lisa Wang',
      username: 'lisareads',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    rating: 5,
    review: "This should be required reading for everyone! Housel explains complex financial psychology in simple terms that anyone can understand.",
    date: '2024-06-05',
    likes: 31,
    helpful: 25
  }
]

const similarBooks = [
  {
    id: '101',
    title: 'A Random Walk Down Wall Street',
    author: 'Burton Malkiel',
    cover: 'https://images.unsplash.com/photo-1621827979802-6d778e161b28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
    rating: 4.4
  },
  {
    id: '102',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    cover: 'https://images.unsplash.com/photo-1511108690759-009324a90311?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
    rating: 4.7
  }
]

export function BookDetailModal({ book, user, onClose }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isInLibrary, setIsInLibrary] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  if (!book) return null

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleAddToLibrary = () => {
    setIsInLibrary(!isInLibrary)
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
        ))}
        <span className="text-sm font-medium ml-2">{rating}</span>
      </div>
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            {/* Header */}
            <div className="flex gap-6 mb-6">
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="w-48 h-72 object-cover rounded-lg shadow-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="font-crimson text-3xl font-bold mb-2">{book.title}</h1>
                    <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>
                    
                    <div className="flex items-center gap-6 mb-4">
                      {renderStars(book.rating)}
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 1000 + 500)} ratings
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{book.genre}</Badge>
                      <Badge variant="outline">{book.pages} pages</Badge>
                      <Badge variant="outline">Published 2020</Badge>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {book.description || "A compelling exploration of financial psychology and human behavior that reveals the hidden forces behind our money decisions."}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button 
                    onClick={handleAddToLibrary}
                    className="gap-2"
                  >
                    {isInLibrary ? (
                      <>
                        <Check className="h-4 w-4" />
                        Added to Library
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add to Library
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Mark as Reading
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleLike}
                    className="gap-2"
                  >
                    <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  
                  <Button variant="outline" className="gap-2">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                {/* Friend Activity Summary */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">{mockFriendActivity.length} friends have this book</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {mockFriendActivity.slice(0, 3).map((friend, index) => (
                        <Avatar key={index} className="h-6 w-6">
                          <AvatarImage src={friend.user.avatar} alt={friend.user.name} />
                          <AvatarFallback className="text-xs">
                            {friend.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {mockFriendActivity.length > 3 && (
                        <span className="text-sm text-muted-foreground">
                          +{mockFriendActivity.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="similar">Similar Books</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">About this book</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The Psychology of Money is a fascinating exploration of the strange ways people think about money and teaches you how to make better sense of one of life's most important topics. Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Key Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Behavioral Psychology', 'Personal Finance', 'Investment Philosophy', 'Risk Management', 'Financial Planning'].map((theme) => (
                      <Badge key={theme} variant="outline">{theme}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.user.name}</span>
                            <span className="text-sm text-muted-foreground">@{review.user.username}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "h-3 w-3",
                                    i < review.rating 
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "text-muted-foreground/30"
                                  )} 
                                />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                            {review.review}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {review.likes} likes
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {review.helpful} found helpful
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="friends" className="space-y-4">
                {mockFriendActivity.map((friend, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.user.avatar} alt={friend.user.name} />
                          <AvatarFallback>{friend.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{friend.user.name}</span>
                            <Badge 
                              variant={
                                friend.status === 'finished' ? 'default' :
                                friend.status === 'currently_reading' ? 'secondary' :
                                'outline'
                              }
                              className="text-xs"
                            >
                              {friend.status === 'finished' ? 'Finished' :
                               friend.status === 'currently_reading' ? 'Reading' :
                               'Want to Read'}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {friend.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                Rated {friend.rating}/5
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(friend.date).toLocaleDateString()}
                            </div>
                          </div>
                          
                          {friend.review && (
                            <p className="text-sm text-muted-foreground mt-2 italic">
                              "{friend.review}"
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="similar" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {similarBooks.map((similarBook) => (
                    <Card key={similarBook.id} className="cursor-pointer book-hover">
                      <CardContent className="p-0">
                        <img
                          src={similarBook.cover}
                          alt={`${similarBook.title} cover`}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-3">
                          <h4 className="font-crimson font-semibold text-sm mb-1 line-clamp-2">
                            {similarBook.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            by {similarBook.author}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{similarBook.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}