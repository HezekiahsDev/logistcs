import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  function halfStarOpacity(rating: number) {
    if (rating % 1 >= 0.1 && rating % 1 <= 0.3) {
      return "opacity-10";
    } else if (rating % 1 >= 0.4 && rating % 1 <= 0.6) {
      return "opacity-30";
    } else {
      return "opacity-70";
    }
  }

  return (
    <div className="flex items-center">
      {[...Array(filledStars)].map((_, index) => (
        <Star
          key={index}
          className="w-3 h-3 text-yellow-500 fill-yellow-500 text-xs"
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          className={`w-3 h-3 text-yellow-500 fill-yellow-500 text-xs ${halfStarOpacity(
            rating
          )}`}
        />
      )}
    </div>
  );
};

export default StarRating;
