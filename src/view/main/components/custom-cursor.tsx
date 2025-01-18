import { FC } from "react";
import { memo } from "react";

interface CustomCursorProps {
  position: { x: number; y: number };
  isVisible: boolean;
  isLiked: boolean;
}

const CustomCursor: FC<CustomCursorProps> = memo(
  ({ position, isVisible, isLiked }) => (
    <div
      className={`
      fixed pointer-events-none z-50 
      flex items-center justify-center 
      w-20 h-20 bg-red-600 text-white text-xs font-semibold rounded-full 
      transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300
      ${isVisible ? "opacity-100" : "opacity-0"}
    `}
      style={{ left: position.x, top: position.y }}
    >
      {isLiked ? "UNLIKE" : "LIKE"}
    </div>
  ),
);

export default CustomCursor;
