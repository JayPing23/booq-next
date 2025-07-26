'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Search, 
  Compass, 
  BookOpen, 
  User, 
  Menu, 
  Bell,
  Heart,
  MessageCircle,
  BookMarked,
  Users,
  Settings,
  Moon,
  Sun
} from 'lucide-react'
import { useTheme } from 'next-themes'

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, description: 'Friend activity feed' },
  { id: 'discover', label: 'Discover', icon: Compass, description: 'Find new books' },
  { id: 'library', label: 'My Library', icon: BookOpen, description: 'Your books & lists' },
  { id: 'profile', label: 'Profile', icon: User, description: 'Your reading profile' }
]

export function AppShell({ children, user, currentView, onViewChange, onBookSelect }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { setTheme, theme } = useTheme()

  const mockSearchResults = [
    {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
      rating: 4.6
    },
    {
      id: '2',
      title: 'Milk and Honey',
      author: 'Rupi Kaur',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxib29rJTIwY292ZXJzfGVufDB8fHx8MTc1MzUyMjc0OXww&ixlib=rb-4.1.0&q=85',
      rating: 4.2
    },
    {
      id: '3',
      title: 'Zero to One',
      author: 'Peter Thiel',
      cover: 'https://images.unsplash.com/photo-1619872553215-8ac017d003f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxiZXN0c2VsbGVyJTIwYm9va3N8ZW58MHx8fHwxNzUzNTM0MjM2fDA&ixlib=rb-4.1.0&q=85',
      rating: 4.8
    }
  ]

  const filteredResults = searchQuery.length > 2 
    ? mockSearchResults.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <h1 className="font-crimson text-3xl font-bold text-primary">booq</h1>
        <p className="text-sm text-muted-foreground mt-1">Social Book Discovery</p>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-4">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? 'default' : 'ghost'}
              className={cn(
                "w-full justify-start h-12 rounded-xl transition-all duration-200",
                currentView === item.id 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </Button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="px-4 mt-8">
          <h3 className="font-semibold text-sm text-muted-foreground mb-4">Your Reading</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Books Read</span>
              <Badge variant="outline">{user.booksRead}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Currently Reading</span>
              <Badge variant="outline">{user.currentlyReading}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Friends</span>
              <Badge variant="outline">{user.friendsCount}</Badge>
            </div>
          </div>
        </div>

        {/* Reading Goal Progress */}
        <div className="px-4 mt-6">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2">2024 Reading Goal</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{user.booksRead} of {user.readingGoal} books</span>
              <span>{Math.round((user.booksRead / user.readingGoal) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((user.booksRead / user.readingGoal) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="w-full justify-start"
        >
          {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:border-r lg:border-border">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search books, authors, friends..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
              </div>
              
              {/* Search Results Dropdown */}
              {isSearchFocused && filteredResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
                  <ScrollArea className="max-h-80">
                    {filteredResults.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer"
                        onClick={() => {
                          onBookSelect(book)
                          setSearchQuery('')
                          setIsSearchFocused(false)
                        }}
                      >
                        <img 
                          src={book.cover} 
                          alt={`${book.title} cover`}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{book.title}</div>
                          <div className="text-xs text-muted-foreground">by {book.author}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="flex text-yellow-400">
                              {'★'.repeat(Math.floor(book.rating))}
                              {'☆'.repeat(5 - Math.floor(book.rating))}
                            </div>
                            <span className="text-xs text-muted-foreground">{book.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? 'default' : 'ghost'}
              size="sm"
              className="flex-col h-auto py-2 px-3"
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="h-4 w-4 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}