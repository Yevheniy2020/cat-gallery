import { useMemo } from "react";
import { cn } from "@/utils/cn"; // your tailwind-merge + clsx helper
import chunkArray from "@/utils/chunkArray";
import {
  useResponsiveColumns,
  MasonryBreakpoints,
} from "@/hooks/useResponsiveColumns";

interface MasonryProps<T> {
  data: T[];
  breakpoints: MasonryBreakpoints;
  renderItem: (item: T) => JSX.Element;
  className?: string;
}

const Masonry = <T,>({
  data,
  breakpoints,
  renderItem,
  className,
}: MasonryProps<T>) => {
  const columns = useResponsiveColumns(breakpoints);
  const chunkedData = useMemo(() => chunkArray(data, columns), [data, columns]);

  return (
    <div
      className={cn("grid gap-4", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {chunkedData.map((columnItems, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {columnItems.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
