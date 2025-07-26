'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BookCard } from '@/components/book-card'
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Users, Star } from 'lucide-react'

const mockBooks = [
  {
    id: '1',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
    rating: 4.6,
    pages: 256,
    genre: 'Finance',
    description: 'Timeless lessons on wealth, greed, and happiness',
    friendsRead: 12,
    isPopular: true
  },
  {
    id: '2',
    title: 'Milk and Honey',
    author: 'Rupi Kaur',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
    rating: 4.2,
    pages: 208,
    genre: 'Poetry',
    description: 'A collection of poetry and prose about survival',
    friendsRead: 8,
    isNew: true
  },
  {
    id: '3',
    title: 'Zero to One',
    author: 'Peter Thiel',
    cover: 'https://images.unsplash.com/photo-1619872553215-8ac017d003f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
    rating: 4.8,
    pages: 224,
    genre: 'Business',
    description: 'Notes on startups, or how to build the future',
    friendsRead: 15,
    isRecommended: true
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
    friendsRead: 9,
    isTrending: true
  },
  {
    id: '5',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    cover: 'https://images.unsplash.com/photo-1616687551818-a9218cddd2dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
    rating: 4.3,
    pages: 224,
    genre: 'Self-Help',
    description: 'A counterintuitive approach to living a good life',
    friendsRead: 18,
    isPopular: true
  },
  {
    id: '6',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1664222845171-f9ffe4579c1f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
    rating: 4.7,
    pages: 320,
    genre: 'Productivity',
    description: 'Tiny changes, remarkable results',
    friendsRead: 22,
    isRecommended: true
  }
]

const discoveryCategories = [
  {
    title: 'Because you loved Science Fiction',
    subtitle: 'Based on your reading history',
    icon: Sparkles,
    books: mockBooks.slice(0, 4)
  },
  {
    title: 'Trending this week',
    subtitle: 'What everyone is talking about',
    icon: TrendingUp,
    books: mockBooks.filter(book => book.isTrending || book.isPopular).slice(0, 4)
  },
  {
    title: 'Friends are reading',
    subtitle: '18 friends recently added these',
    icon: Users,
    books: mockBooks.filter(book => book.friendsRead > 10).slice(0, 4)
  },
  {
    title: 'Staff picks',
    subtitle: 'Curated by our book experts',
    icon: Star,
    books: mockBooks.slice(2, 6)
  }
]

export function BookDiscoveryFeed({ onBookSelect }) {
  const [activeCategory, setActiveCategory] = useState(null)

  const CarouselSection = ({ category, index }) => {
    const scrollRef = React.useRef(null)

    const scroll = (direction) => {
      if (scrollRef.current) {
        const scrollAmount = 320
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        })
      }
    }

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <category.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-crimson text-2xl font-semibold">{category.title}</h2>
              <p className="text-sm text-muted-foreground">{category.subtitle}</p>
            </div>
          </div>
          
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('left')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('right')}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-thin pb-4 carousel-container"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {category.books.map((book, bookIndex) => (
            <div 
              key={book.id} 
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <BookCard 
                book={book} 
                variant="carousel"
                onSelect={onBookSelect}
                className="w-64"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/20 via-secondary/10 to-background border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl">
            <h1 className="font-crimson text-4xl md:text-6xl font-bold mb-4">
              Discover your next 
              <span className="text-primary"> great read</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Personalized recommendations based on what you love and what your friends are reading
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['Science Fiction', 'Mystery', 'Philosophy', 'Biography'].map((genre) => (
                <Badge key={genre} variant="secondary" className="px-4 py-2">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Categories */}
      <div className="container mx-auto px-6 py-8">
        {discoveryCategories.map((category, index) => (
          <CarouselSection key={index} category={category} index={index} />
        ))}
      </div>

      {/* Explore All Books */}
      <div className="container mx-auto px-6 pb-8">
        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-crimson text-2xl font-semibold">All Books</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Filter by Genre
              </Button>
              <Button variant="outline" size="sm">
                Sort by Rating
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                variant="grid"
                onSelect={onBookSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Import React for useRef
import React from 'react'