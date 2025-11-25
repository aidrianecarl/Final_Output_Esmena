interface StarRatingProps {
  rating: number
  size?: "sm" | "md" | "lg"
}

export default function StarRating({ rating, size = "md" }: StarRatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-2">
      <div className={`flex text-yellow-400 ${sizeClasses[size]}`}>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <span key={i}>★</span>
          } else if (i === fullStars && hasHalfStar) {
            return <span key={i}>⭐</span>
          } else {
            return <span key={i}>☆</span>
          }
        })}
      </div>
      <span className="text-sm text-muted-foreground font-medium">({rating.toFixed(1)})</span>
    </div>
  )
}
