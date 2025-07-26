'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookCard } from '@/components/book-card'
import { 
  Calendar, 
  MapPin, 
  Link2, 
  Settings, 
  Users, 
  BookOpen,
  Star,
  Award,
  TrendingUp,
  Heart,
  MessageCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

const mockUserBooks = [
  {
    id: '1',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
    rating: 4.6,
    myRating: 5,
    genre: 'Finance',
    dateFinished: '2024-06-10'
  },
  {
    id: '2',
    title: 'Zero to One',
    author: 'Peter Thiel',
    cover: 'https://images.unsplash.com/photo-1619872553215-8ac017d003f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
    rating: 4.8,
    myRating: 4,
    genre: 'Business',
    dateFinished: '2024-05-28'
  },
  {
    id: '3',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    cover: 'https://images.unsplash.com/photo-1616687551818-a9218cddd2dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
    rating: 4.3,
    myRating: 5,
    genre: 'Self-Help',
    dateFinished: '2024-05-15'
  }
]

const mockReviews = [
  {
    id: '1',
    book: {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85'
    },
    rating: 5,
    review: "Absolutely brilliant insights on how our psychology affects our financial decisions. Morgan Housel's writing is clear and accessible, making complex financial concepts easy to understand. The stories and examples he uses are compelling and memorable. This book completely changed how I think about money and investing.",
    date: '2024-06-10',
    likes: 24,
    comments: 5
  },
  {
    id: '2',
    book: {
      title: 'Zero to One',
      author: 'Peter Thiel',
      cover: 'https://images.unsplash.com/photo-1619872553215-8ac017d003f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85'
    },
    rating: 4,
    review: "Thiel's contrarian thinking is fascinating and thought-provoking. While I don't agree with everything he says, the book offers valuable insights into startups, monopolies, and innovation. The section on building team culture and finding the right people was particularly useful.",
    date: '2024-05-28',
    likes: 18,
    comments: 3
  }
]

const readingStats = {
  totalBooks: 47,
  totalPages: 12458,
  averageRating: 4.2,
  favoriteGenres: ['Science Fiction', 'Mystery', 'Philosophy', 'Biography'],
  readingStreak: 23,
  monthlyAverage: 4.2,
  yearProgress: {
    current: 47,
    goal: 52,
    percentage: 90
  }
}

export function UserProfile({ user, onBookSelect }) {
  const [activeTab, setActiveTab] = useState('books')

  const ProfileHeader = () => (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/10 to-background rounded-t-lg" />
      
      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 sm:mb-4">
            <h1 className="font-crimson text-3xl font-bold mb-1">{user.name}</h1>
            <p className="text-muted-foreground mb-2">@{user.username}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined March 2023
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1">
                <Link2 className="h-4 w-4" />
                alexreads.blog
              </div>
            </div>

            <p className="text-sm mb-4 max-w-md">
              Passionate reader exploring the intersections of technology, philosophy, and human behavior. 
              Always excited to discover new perspectives through books. 📚✨
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="font-semibold">{user.friendsCount}</span>
                <span className="text-muted-foreground">friends</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span className="font-semibold">{readingStats.totalBooks}</span>
                <span className="text-muted-foreground">books read</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const ReadingStatsCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Reading Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{readingStats.totalBooks}</div>
            <div className="text-sm text-muted-foreground">Books Read</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{readingStats.totalPages.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Pages Read</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{readingStats.averageRating}</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{readingStats.readingStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Favorite Genres</h4>
          <div className="flex flex-wrap gap-2">
            {readingStats.favoriteGenres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const BookshelfGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {mockUserBooks.map((book) => (
        <Card key={book.id} className="group cursor-pointer book-hover" onClick={() => onBookSelect(book)}>
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              
              {/* My Rating Overlay */}
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {book.myRating}
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="font-crimson font-semibold text-sm leading-tight mb-1 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">by {book.author}</p>
              <div className="text-xs text-muted-foreground">
                Finished {new Date(book.dateFinished).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const ReviewsList = () => (
    <div className="space-y-6">
      {mockReviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <img
                src={review.book.cover}
                alt={`${review.book.title} cover`}
                className="w-16 h-22 object-cover rounded cursor-pointer book-hover"
                onClick={() => onBookSelect(review.book)}
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 
                    className="font-crimson font-semibold text-lg cursor-pointer hover:text-primary"
                    onClick={() => onBookSelect(review.book)}
                  >
                    {review.book.title}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "h-4 w-4",
                          i < review.rating 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-muted-foreground/30"
                        )} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">by {review.book.author}</p>
                
                <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                  "{review.review}"
                </blockquote>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {review.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {review.comments}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <Card className="mb-8">
          <ProfileHeader />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ReadingStatsCard />
          </div>

          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="books" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Books
                </TabsTrigger>
                <TabsTrigger value="reviews" className="gap-2">
                  <Star className="h-4 w-4" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="achievements" className="gap-2">
                  <Award className="h-4 w-4" />
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="books">
                <BookshelfGrid />
              </TabsContent>

              <TabsContent value="reviews">
                <ReviewsList />
              </TabsContent>

              <TabsContent value="achievements">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="p-4 bg-yellow-500/10 rounded-full w-fit mx-auto mb-4">
                        <Award className="h-8 w-8 text-yellow-500" />
                      </div>
                      <h3 className="font-semibold mb-2">Goal Achiever</h3>
                      <p className="text-sm text-muted-foreground">
                        Completed 2023 reading goal of 40 books
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="p-4 bg-blue-500/10 rounded-full w-fit mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-blue-500" />
                      </div>
                      <h3 className="font-semibold mb-2">Avid Reader</h3>
                      <p className="text-sm text-muted-foreground">
                        Read 50+ books in a single year
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}