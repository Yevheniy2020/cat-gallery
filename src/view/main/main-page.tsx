import { useEntityActions } from "@/hooks/useEntityActions";
import { useGetAllImages } from "@/services/images";
import { FC, useMemo, useState } from "react";
import CatGallery from "./components/cat-gallery";
import SkeletonMasonry from "@/components/common/skeleton-masonry";
import { breakpoints } from "./constant";
import ErrorBlock from "@/components/common/error/error-block";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/common/error/error-fallback";
import { useFavorites } from "@/hooks/useFavorite";

const MainPage: FC = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { data, isLoading, isError } = useEntityActions<ImageDto>({
    useGetAll: useGetAllImages,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (showFavorites) {
      return data.filter((image) => favorites.includes(image.id));
    }
    return data;
  }, [data, showFavorites, favorites]);

  const toggleView = () => setShowFavorites((prev) => !prev);

  return (
    <div className="bg-zinc-900">
      <div className="max-w-screen-xl mx-auto p-8">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={toggleView}
            className={`px-6 py-2 rounded-full font-medium transition-colors
              ${
                showFavorites
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
          >
            {showFavorites ? "❤️ Favorites" : "🐱 All Cats"}
          </button>

          {showFavorites && (
            <span className="text-zinc-400">
              {filteredData.length} favorite
              {filteredData.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {showFavorites && filteredData.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">
              No favorite cats yet! 😿
            </h3>
            <p className="text-zinc-400">
              Click on any cat photo to add it to your favorites.
            </p>
          </div>
        )}

        {isError && (
          <ErrorBlock
            title="Oops, something went wrong! 🐱"
            description="We couldn't load the cat images right now. Please try again later."
          />
        )}

        {isLoading && (
          <SkeletonMasonry quantity={10} breakpoints={breakpoints}>
            <div className="w-full h-full bg-zinc-700 rounded-lg p-32"></div>
          </SkeletonMasonry>
        )}

        {data?.length != 0 && !isLoading && (
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
