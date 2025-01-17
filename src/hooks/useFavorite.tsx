import { FavoritesStorage } from "@/utils/localStorage";
import { useState, useEffect, useCallback, useRef } from "react";

export interface UseFavoritesReturn {
  favorites: string[];
  isFavorite: (imageId: string) => boolean;
  toggleFavorite: (imageId: string) => void;
  addFavorite: (imageId: string) => void;
  removeFavorite: (imageId: string) => void;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>(() =>
    FavoritesStorage.getFavorites(),
  );

  const isMounted = useRef(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "favorites") {
        const newFavorites = event.newValue ? JSON.parse(event.newValue) : [];
        setFavorites(newFavorites);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    isMounted.current = true;

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      isMounted.current = false;
    };
  }, []);

  const isFavorite = useCallback(
    (imageId: string): boolean => {
      return favorites.includes(imageId);
    },
    [favorites],
  );

  const toggleFavorite = useCallback((imageId: string) => {
    setFavorites((prev) => {
      const isCurrentlyFavorited = prev.includes(imageId);
      const newFavorites = isCurrentlyFavorited
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId];

      FavoritesStorage.setFavorites(newFavorites);
      return newFavorites;
    });
  }, []);

  const addFavorite = useCallback((imageId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(imageId)) {
        const newFavorites = [...prev, imageId];
        FavoritesStorage.setFavorites(newFavorites);
        return newFavorites;
      }
      return prev;
    });
  }, []);

  const removeFavorite = useCallback((imageId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== imageId);
      FavoritesStorage.setFavorites(newFavorites);
      return newFavorites;
    });
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  };
}
