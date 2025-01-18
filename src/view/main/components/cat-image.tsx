import { FC, memo } from "react";

interface CatImageProps {
  image: ImageDto;
  isLiked: boolean;
  isTablet: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onToggleFavorite: () => void;
}

const CatImage: FC<CatImageProps> = memo(
  ({
    image,
    isLiked,
    isTablet,
    onMouseEnter,
    onMouseLeave,
    onToggleFavorite,
  }) => {
    const breedName = image.breeds[0]?.name;

    return (
      <div
        className="relative w-full h-full group"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onToggleFavorite}
      >
        <img
          className="w-full h-full object-cover bg-zinc-700 rounded-lg"
          src={image.url}
          alt={breedName || "Cat"}
          loading="lazy"
        />
        {breedName && (
          <div className="absolute bottom-0 text-center left-0 px-4 bg-black/40 w-full text-white text-sm font-semibold overflow-hidden line-clamp-1">
            {breedName}
          </div>
        )}
        <div
          className={`
          absolute top-0 left-0 rounded-lg w-full h-full z-2 
          bg-gradient-to-t from-red-600 transition-opacity duration-300
          ${
            isLiked
              ? "opacity-50"
              : isTablet
                ? "opacity-0"
                : "opacity-0 group-hover:opacity-50"
          }
        `}
        />
      </div>
    );
  },
);

export default CatImage;
