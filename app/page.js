'use client'

import { useState, useEffect } from 'react'
import { AppShell } from '@/components/app-shell'
import { BookDiscoveryFeed } from '@/components/book-discovery-feed'
import { SocialFeed } from '@/components/social-feed'
import { LibraryDashboard } from '@/components/library-dashboard'
import { UserProfile } from '@/components/user-profile'
import { BookDetailModal } from '@/components/book-detail-modal'

export default function App() {
  const [currentView, setCurrentView] = useState('discover')
  const [selectedBook, setSelectedBook] = useState(null)
  const [user, setUser] = useState({
    id: '1',
    name: 'Alex Chen',
    username: 'alexreads',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    booksRead: 47,
    currentlyReading: 3,
    friendsCount: 156,
    readingGoal: 52,
    favoriteGenres: ['Science Fiction', 'Mystery', 'Philosophy']
  })

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  const handleBookSelect = (book) => {
    setSelectedBook(book)
  }

  const handleCloseModal = () => {
    setSelectedBook(null)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <SocialFeed onBookSelect={handleBookSelect} />
      case 'discover':
        return <BookDiscoveryFeed onBookSelect={handleBookSelect} />
      case 'library':
        return <LibraryDashboard user={user} onBookSelect={handleBookSelect} />
      case 'profile':
        return <UserProfile user={user} onBookSelect={handleBookSelect} />
      default:
        return <BookDiscoveryFeed onBookSelect={handleBookSelect} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppShell 
        user={user} 
        currentView={currentView} 
        onViewChange={handleViewChange}
        onBookSelect={handleBookSelect}
      >
        {renderCurrentView()}
      </AppShell>
      
      {selectedBook && (
        <BookDetailModal 
          book={selectedBook} 
          user={user}
          onClose={handleCloseModal} 
        />
      )}
    </div>
  )
}