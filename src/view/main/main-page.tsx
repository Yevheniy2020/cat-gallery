import { useEntityActions } from "@/hooks/useEntityActions";
import { useGetAllImages } from "@/services/images";
import { FC, useCallback, useMemo, useState } from "react";
import CatGallery from "./components/cat-gallery";
import SkeletonMasonry from "@/components/common/skeleton-masonry";
import { breakpoints } from "./constant";
import { ErrorBoundary } from "react-error-boundary";
import { useFavorites } from "@/hooks/useFavorite";
import ErrorFallback from "@/components/common/error-fallback";
import InfoBlock from "@/components/common/info-block";
import CatHeader from "./components/cat-header";

const errorContent = (
  <InfoBlock
    title="Oops, something went wrong! 🐱"
    description="We couldn't load the cat images right now. Please try again later."
  />
);

const MainPage: FC = () => {
  const [filters, setFilters] = useState({
    showFavorites: false,
    searchTerm: "",
  });
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { data, isLoading, isError } = useEntityActions<ImageDto>({
    useGetAll: useGetAllImages,
    params: {
      has_breeds: true,
      size: "small",
      limit: 10,
    },
  });

  const handleFavoritesToggle = useCallback((show: boolean) => {
    setFilters((prev) => ({ ...prev, showFavorites: show }));
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  }, []);

  const filteredData = useMemo(() => {
    if (!data?.length) return [];

    return data.filter((image) => {
      const matchesSearch =
        !filters.searchTerm ||
        image.breeds[0]?.name
          ?.toLowerCase()
          .includes(filters.searchTerm.toLowerCase());
      const matchesFavorites =
        !filters.showFavorites || favorites.includes(image.id);

      return matchesSearch && matchesFavorites;
    });
  }, [data, filters.showFavorites, filters.searchTerm, favorites]);

  const loadingContent = useMemo(
    () => (
      <SkeletonMasonry quantity={10} breakpoints={breakpoints}>
        <div className="w-full h-full bg-zinc-700 rounded-lg p-32" />
      </SkeletonMasonry>
    ),
    [],
  );

  return (
    <div className="bg-zinc-900">
      <div className="max-w-screen-xl mx-auto p-6 sm:p-8">
        <CatHeader
          setShowFavorites={handleFavoritesToggle}
          setSearchTerm={handleSearchChange}
          showFavorites={filters.showFavorites}
          data={filteredData}
          isLoading={isLoading}
        />

        {isError && errorContent}
        {isLoading && loadingContent}

        {filteredData.length > 0 && (
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
          >
            <CatGallery
              data={filteredData}
              breakpoints={breakpoints}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};

export default MainPage;
