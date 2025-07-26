'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookCard } from '@/components/book-card'
import { 
  BookOpen, 
  BookMarked, 
  CheckCircle2, 
  Clock, 
  Target,
  TrendingUp,
  Calendar,
  Award,
  Plus
} from 'lucide-react'

const mockLibraryBooks = {
  currentlyReading: [
    {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
      rating: 4.6,
      pages: 256,
      currentPage: 124,
      genre: 'Finance',
      description: 'Timeless lessons on wealth, greed, and happiness',
      dateStarted: '2024-06-15',
      progress: 48
    },
    {
      id: '2',
      title: 'Zero to One',
      author: 'Peter Thiel',
      cover: 'https://images.unsplash.com/photo-1619872553215-8ac017d003f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
      rating: 4.8,
      pages: 224,
      currentPage: 67,
      genre: 'Business',
      description: 'Notes on startups, or how to build the future',
      dateStarted: '2024-06-20',
      progress: 30
    }
  ],
  wantToRead: [
    {
      id: '3',
      title: 'Milk and Honey',
      author: 'Rupi Kaur',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
      rating: 4.2,
      pages: 208,
      genre: 'Poetry',
      description: 'A collection of poetry and prose about survival',
      dateAdded: '2024-06-18',
      priority: 'high'
    },
    {
      id: '4',
      title: '12 Rules for Life',
      author: 'Jordan B. Peterson',
      cover: 'https://images.unsplash.com/photo-1597149305638-fef8c2b1981b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
      rating: 4.4,
      pages: 448,
      genre: 'Psychology',
      description: 'An antidote to chaos',
      dateAdded: '2024-06-22',
      priority: 'medium'
    }
  ],
  finished: [
    {
      id: '5',
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      cover: 'https://images.unsplash.com/photo-1616687551818-a9218cddd2dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
      rating: 4.3,
      pages: 224,
      genre: 'Self-Help',
      description: 'A counterintuitive approach to living a good life',
      dateFinished: '2024-06-10',
      myRating: 5,
      hasReview: true
    }
  ]
}

export function LibraryDashboard({ user, onBookSelect }) {
  const [activeTab, setActiveTab] = useState('currently-reading')

  const ReadingStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Books Read</p>
              <p className="text-2xl font-bold">{user.booksRead}</p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Currently Reading</p>
              <p className="text-2xl font-bold">{user.currentlyReading}</p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Want to Read</p>
              <p className="text-2xl font-bold">{mockLibraryBooks.wantToRead.length}</p>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <BookMarked className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reading Goal</p>
              <p className="text-2xl font-bold">{Math.round((user.booksRead / user.readingGoal) * 100)}%</p>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded-full">
              <Target className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ReadingGoalCard = () => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          2024 Reading Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {user.booksRead} of {user.readingGoal} books
            </span>
            <span className="text-sm text-muted-foreground">
              {user.readingGoal - user.booksRead} books to go
            </span>
          </div>
          
          <Progress 
            value={(user.booksRead / user.readingGoal) * 100} 
            className="h-3"
          />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Average: 4.2 books/month
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              On track to finish Dec 15
            </div>
          </div>

          {user.booksRead >= user.readingGoal && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg">
              <Award className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-green-500">
                Congratulations! You've reached your reading goal! 🎉
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const CurrentlyReadingCard = ({ book }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            className="w-20 h-28 object-cover rounded cursor-pointer book-hover"
            onClick={() => onBookSelect(book)}
          />
          
          <div className="flex-1">
            <h3 
              className="font-crimson font-semibold text-lg mb-1 cursor-pointer hover:text-primary"
              onClick={() => onBookSelect(book)}
            >
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {book.currentPage} / {book.pages} pages</span>
                <span className="font-medium">{book.progress}%</span>
              </div>
              
              <Progress value={book.progress} className="h-2" />
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Started {new Date(book.dateStarted).toLocaleDateString()}
                </div>
                <Badge variant="outline" className="text-xs">
                  {book.genre}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline">
                Update Progress
              </Button>
              <Button size="sm" variant="outline">
                Mark as Finished
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-crimson text-3xl font-semibold mb-2">My Library</h1>
              <p className="text-muted-foreground">
                Manage your books and track your reading progress
              </p>
            </div>
            
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Books
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <ReadingStats />
        
        <ReadingGoalCard />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="currently-reading" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Currently Reading
            </TabsTrigger>
            <TabsTrigger value="want-to-read" className="gap-2">
              <BookMarked className="h-4 w-4" />
              Want to Read
            </TabsTrigger>
            <TabsTrigger value="finished" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Finished
            </TabsTrigger>
          </TabsList>

          <TabsContent value="currently-reading" className="space-y-4">
            {mockLibraryBooks.currentlyReading.length > 0 ? (
              mockLibraryBooks.currentlyReading.map((book) => (
                <CurrentlyReadingCard key={book.id} book={book} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No books currently reading</h3>
                  <p className="text-muted-foreground mb-4">
                    Start reading a book to see your progress here
                  </p>
                  <Button>Browse Books</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="want-to-read" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLibraryBooks.wantToRead.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  variant="grid"
                  onSelect={onBookSelect}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="finished" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLibraryBooks.finished.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  variant="grid"
                  onSelect={onBookSelect}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}