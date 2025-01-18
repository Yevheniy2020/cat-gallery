import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";

export interface MasonryBreakpoints {
  default: number;
  sm?: number; // >= 640px
  md?: number; // >= 768px
  lg?: number; // >= 1024px
  xl?: number; // >= 1280px
}

export function useResponsiveColumns(breakpoints: MasonryBreakpoints) {
  const [columns, setColumns] = useState(breakpoints.default);

  function updateColumns() {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    let newCols = breakpoints.default;

    if (width >= 1280 && breakpoints.xl) {
      newCols = breakpoints.xl;
    } else if (width >= 1024 && breakpoints.lg) {
      newCols = breakpoints.lg;
    } else if (width >= 768 && breakpoints.md) {
      newCols = breakpoints.md;
    } else if (width >= 640 && breakpoints.sm) {
      newCols = breakpoints.sm;
    }

    setColumns(newCols);
  }

  useEffect(() => {
    updateColumns();
  }, []);

  useEventListener<Window, UIEvent>(
    "resize",
    () => {
      updateColumns();
    },
    typeof window !== "undefined" ? window : null,
  );

  return columns;
}
