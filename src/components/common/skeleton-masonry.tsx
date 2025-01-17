import { FC } from "react";
import Masonry from "./masonry";
import { MasonryBreakpoints } from "@/hooks/useResponsiveColumns";

interface SkeletonMasonryProps {
  quantity: number;
  breakpoints: MasonryBreakpoints;
  children: JSX.Element;
}

const SkeletonMasonry: FC<SkeletonMasonryProps> = ({
  quantity,
  breakpoints,
  children,
}) => {
  return (
    <Masonry
      data={Array.from({ length: quantity })}
      breakpoints={breakpoints}
      renderItem={() => <>{children}</>}
    />
  );
};

export default SkeletonMasonry;
