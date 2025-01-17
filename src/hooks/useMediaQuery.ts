import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";

export default function useMediaQuery(query: string): boolean {
  const [isMatch, setIsMatch] = useState(false);
  const [mql, setMql] = useState<MediaQueryList | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const list = window.matchMedia(query);
    setMql(list);
    setIsMatch(list.matches);
  }, [query]);

  useEventListener<MediaQueryList, MediaQueryListEvent>(
    "change",
    (e) => {
      setIsMatch(e.matches);
    },
    mql,
  );

  return isMatch;
}
