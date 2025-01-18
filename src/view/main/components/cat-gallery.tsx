import { FC, memo, useCallback } from "react";
import Masonry from "@/components/common/masonry";
import { MasonryBreakpoints } from "@/hooks/useResponsiveColumns";
import { useGalleryCursor } from "@/hooks/useGalleryCursor";
import useMediaQuery from "@/hooks/useMediaQuery";
import CatImage from "./cat-image";
import CustomCursor from "./custom-cursor";

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
  } = useGalleryCursor({ data });

  const renderItem = useCallback(
    (image: ImageDto) => (
      <CatImage
        key={image.id}
        image={image}
        isLiked={isFavorite(image.id)}
        isTablet={isTablet}
        onMouseEnter={() => handleMouseEnter(image)}
        onMouseLeave={handleMouseLeave}
        onToggleFavorite={() => toggleFavorite(image.id)}
      />
    ),
    [isTablet, handleMouseEnter, handleMouseLeave, toggleFavorite, isFavorite],
  );

  return (
    <div
      className={`relative ${hovered ? "cursor-none" : ""}`}
      onMouseMove={handleMouseMove}
    >
      <CustomCursor
        position={cursorPosition}
        isVisible={hovered}
        isLiked={hoveredItem ? isFavorite(hoveredItem.id) : false}
      />
      <Masonry data={data} breakpoints={breakpoints} renderItem={renderItem} />
    </div>
  );
};

export default memo(CatGallery);
