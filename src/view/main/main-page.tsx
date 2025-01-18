import { useEntityActions } from "@/hooks/useEntityActions";
import { useGetAllImages } from "@/services/images";
import { FC, useMemo, useState } from "react";
import CatGallery from "./components/cat-gallery";
import SkeletonMasonry from "@/components/common/skeleton-masonry";
import { breakpoints, DUMMY_DATA_ERROR } from "./constant";
import ErrorBlock from "@/components/common/info-block";
import { ErrorBoundary } from "react-error-boundary";
import { useFavorites } from "@/hooks/useFavorite";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import ErrorFallback from "@/components/common/error-fallback";
import InfoBlock from "@/components/common/info-block";

const MainPage: FC = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useEntityActions<ImageDto>({
    useGetAll: useGetAllImages,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    let filtered = data;
    if (searchTerm) {
      filtered = filtered.filter((image) =>
        image.breeds[0]?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (showFavorites) {
      filtered = filtered.filter((image) => favorites.includes(image.id));
    }
    return filtered;
  }, [data, showFavorites, favorites, searchTerm]);

  const toggleView = () => setShowFavorites((prev) => !prev);

  return (
    <div className="bg-zinc-900">
      <div className="max-w-screen-xl mx-auto p-6 sm:p-8">
        <div className="mb-6 flex justify-between items-center flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2 items-center">
            <Button
              onClick={toggleView}
              className={`
              ${
                showFavorites
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {showFavorites ? "❤️ Favorites" : "🐱 All Cats"}
            </Button>

            <Input
              className="max-w-40"
              variant="primary"
              placeholder="Find by been..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {showFavorites && (
            <span className="text-zinc-400">
              {filteredData.length} favorite
              {filteredData.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {showFavorites && filteredData.length === 0 && !isLoading && (
          <InfoBlock
            title="No favorite cats yet! 😿"
            description="Click on any cat photo to add it to your favorites."
          />
        )}

        {!showFavorites && filteredData.length === 0 && !isLoading && (
          <InfoBlock
            title="ops, no cats to show! 😿"
            description="You haven't missed anything yet! We'll add more cats soon."
          />
        )}

        {isError && (
          <InfoBlock
            title="Oops, something went wrong! 🐱"
            description="We couldn't load the cat images right now. Please try again later."
          />
        )}

        {isLoading && (
          <SkeletonMasonry quantity={10} breakpoints={breakpoints}>
            <div className="w-full h-full bg-zinc-700 rounded-lg p-32"></div>
          </SkeletonMasonry>
        )}

        {filteredData?.length && (
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
