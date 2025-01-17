export type StorageKey = "favorites";

export function getStorageItem<T>(key: StorageKey): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item from localStorage:`, error);
    return null;
  }
}

export function setStorageItem<T>(key: StorageKey, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in localStorage:`, error);
  }
}

export const FavoritesStorage = {
  getFavorites(): string[] {
    return getStorageItem<string[]>("favorites") || [];
  },

  setFavorites(favorites: string[]): void {
    setStorageItem("favorites", favorites);
  },

  addFavorite(imageId: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(imageId)) {
      this.setFavorites([...favorites, imageId]);
    }
  },

  removeFavorite(imageId: string): void {
    const favorites = this.getFavorites();
    this.setFavorites(favorites.filter((id) => id !== imageId));
  },

  toggleFavorite(imageId: string): boolean {
    const favorites = this.getFavorites();
    const isFavorited = favorites.includes(imageId);

    if (isFavorited) {
      this.removeFavorite(imageId);
    } else {
      this.addFavorite(imageId);
    }

    return !isFavorited;
  },
};
