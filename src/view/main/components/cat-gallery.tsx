import { FC } from "react";
import Masonry from "@/components/common/masonry";
import { MasonryBreakpoints } from "@/hooks/useResponsiveColumns";
import { useGalleryCursor } from "@/hooks/useGalleryCursor";
import useMediaQuery from "@/hooks/useMediaQuery";

interface CatGalleryProps {
  data: ImageDto[];
  breakpoints: MasonryBreakpoints;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const CatGallery: FC<CatGalleryProps> = ({
  data,
  breakpoints,
  isFavorite,
  toggleFavorite,
}) => {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const {
    cursorPosition,
    hovered,
    hoveredItem,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useGalleryCursor({
    data,
  });

  return (
    <div
      className={`relative ${hovered ? "cursor-none" : ""}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`fixed pointer-events-none z-50 flex items-center justify-center w-20 h-20 bg-red-600 text-white text-xs font-semibold rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      >
        {hoveredItem && (isFavorite(hoveredItem.id) ? "UNLIKE" : "LIKE")}
      </div>
      <Masonry
        data={data}
        breakpoints={breakpoints}
        renderItem={(image) => {
          const breedName = image.breeds[0]?.name;
          return (
            <div
              className="relative w-full h-full group"
              onMouseEnter={() => handleMouseEnter(image)}
              onMouseLeave={handleMouseLeave}
              onClick={() => toggleFavorite(image.id)}
            >
              <img
                className="w-full h-full object-cover bg-zinc-700 rounded-lg"
                src={image.url}
                alt={breedName && "Cat"}
                loading="lazy"
              />
              {breedName && (
                <div className="absolute bottom-0 text-center left-0 px-4 bg-black bg-opacity-40 w-full text-white text-sm font-semibold overflow-hidden line-clamp-1">
                  {breedName}
                </div>
              )}
              <div
                className={`absolute top-0 left-0 rounded-lg w-full h-full z-2 bg-gradient-to-t from-red-600 transition-opacity duration-300
                  ${
                    isFavorite(image.id)
                      ? "opacity-50"
                      : isTablet
                        ? "opacity-0"
                        : "opacity-0 group-hover:opacity-50"
                  }`}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default CatGallery;
