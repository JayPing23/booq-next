'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Heart, 
  BookOpen, 
  Star, 
  Users, 
  Plus,
  MoreHorizontal,
  BookMarked
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function BookCard({ book, variant = 'standard', onSelect, className }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isInLibrary, setIsInLibrary] = useState(false)

  const handleLike = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleAddToLibrary = (e) => {
    e.stopPropagation()
    setIsInLibrary(!isInLibrary)
  }

  const handleCardClick = () => {
    onSelect(book)
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-3 w-3 fill-yellow-400/50 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="h-3 w-3 text-muted-foreground/30" />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{rating}</span>
      </div>
    )
  }

  if (variant === 'carousel') {
    return (
      <Card 
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card border-0 shadow-sm hover:shadow-primary/10",
          className
        )}
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {book.isNew && <Badge className="bg-emerald-500/90 text-white backdrop-blur-sm">New</Badge>}
              {book.isPopular && <Badge className="bg-red-500/90 text-white backdrop-blur-sm">Popular</Badge>}
              {book.isTrending && <Badge className="bg-orange-500/90 text-white backdrop-blur-sm">Trending</Badge>}
              {book.isRecommended && <Badge className="bg-primary/90 text-white backdrop-blur-sm">Recommended</Badge>}
            </div>

            {/* Quick actions */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm"
                  onClick={handleLike}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm"
                  onClick={handleAddToLibrary}
                >
                  {isInLibrary ? (
                    <BookMarked className="h-4 w-4 text-primary" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Friends indicator */}
            {book.friendsRead > 0 && (
              <div className="absolute bottom-3 left-3 bg-black/80 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 backdrop-blur-sm">
                <Users className="h-3 w-3" />
                {book.friendsRead} friends read
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="font-crimson font-bold text-lg leading-tight mb-2 line-clamp-2 text-foreground">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
            
            {renderStars(book.rating)}
            
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
              {book.description}
            </p>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <Badge variant="outline" className="text-xs border-primary/20 text-primary/80">
                {book.genre}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {book.pages} pages
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'grid') {
    return (
      <Card 
        className={cn(
          "group cursor-pointer book-hover bg-card/50 backdrop-blur-sm border-0 shadow-md",
          className
        )}
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            
            {/* Quick actions */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                className="h-7 w-7 p-0 bg-white/90 hover:bg-white"
                onClick={handleAddToLibrary}
              >
                {isInLibrary ? (
                  <BookMarked className="h-3 w-3 text-primary" />
                ) : (
                  <Plus className="h-3 w-3" />
                )}
              </Button>
            </div>

            {/* Rating overlay */}
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {book.rating}
            </div>
          </div>

          <div className="p-3">
            <h3 className="font-crimson font-semibold text-sm leading-tight mb-1 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-2">by {book.author}</p>
            
            {book.friendsRead > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                {book.friendsRead} friends
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Standard variant (default)
  return (
    <Card 
      className={cn(
        "group cursor-pointer book-hover bg-card/50 backdrop-blur-sm",
        className
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="w-16 h-24 object-cover rounded"
            />
            {isInLibrary && (
              <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1">
                <BookMarked className="h-3 w-3" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-crimson font-semibold text-lg leading-tight mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {renderStars(book.rating)}

            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {book.description}
            </p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {book.genre}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {book.pages} pages
                </span>
              </div>

              <div className="flex items-center gap-2">
                {book.friendsRead > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {book.friendsRead}
                  </div>
                )}
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLike}
                  className="h-8 w-8 p-0"
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddToLibrary}
                  className="h-8 px-3"
                >
                  {isInLibrary ? (
                    <>
                      <BookMarked className="h-3 w-3 mr-1" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}