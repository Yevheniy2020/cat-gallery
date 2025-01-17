import { useState, useEffect } from "react";
import useMediaQuery from "./useMediaQuery";

interface CursorPosition {
  x: number;
  y: number;
}

interface UseGalleryCursorProps<T> {
  data: T[];
}

interface UseGalleryCursorReturn<T> {
  cursorPosition: CursorPosition;
  hovered: boolean;
  hoveredItem: T | null;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseEnter: (item: T) => void;
  handleMouseLeave: () => void;
}

export function useGalleryCursor<T extends { id: string }>({
  data,
}: UseGalleryCursorProps<T>): UseGalleryCursorReturn<T> {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [hovered, setHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<T | null>(null);

  useEffect(() => {
    if (hoveredItem && !data.some((item) => item.id === hoveredItem.id)) {
      setHovered(false);
      setHoveredItem(null);
    }
  }, [data, hoveredItem]);

  useEffect(() => {
    if (isTablet) {
      setHovered(false);
      setHoveredItem(null);
    }
  }, [isTablet]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isTablet) {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseEnter = (item: T) => {
    if (!isTablet) {
      setHovered(true);
      setHoveredItem(item);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setHoveredItem(null);
  };

  if (isTablet) {
    return {
      cursorPosition: { x: 0, y: 0 },
      hovered: false,
      hoveredItem: null,
      handleMouseMove: () => {},
      handleMouseEnter: () => {},
      handleMouseLeave: () => {},
    };
  }

  return {
    cursorPosition,
    hovered,
    hoveredItem,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
