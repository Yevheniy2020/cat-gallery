import { memo } from "react";
import InfoBlock from "@/components/common/info-block";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";

interface CatHeaderProps {
  setShowFavorites: (value: boolean) => void;
  setSearchTerm: (value: string) => void;
  showFavorites: boolean;
  data: ImageDto[];
  isLoading: boolean;
}

const EmptyStateMessage = ({ showFavorites }: { showFavorites: boolean }) => (
  <InfoBlock
    title={
      showFavorites ? "No favorite cats yet! 😿" : "Oops, no cats to show! 😿"
    }
    description={
      showFavorites
        ? "Click on any cat photo to add it to your favorites."
        : "You haven't missed anything yet! We'll add more cats soon."
    }
  />
);
const FavoriteCounter = ({ count }: { count: number }) => (
  <span className="text-zinc-400">
    {count} favorite{count !== 1 ? "s" : ""}
  </span>
);

const CatHeader = memo(
  ({
    setShowFavorites,
    setSearchTerm,
    showFavorites,
    data,
    isLoading,
  }: CatHeaderProps) => {
    const toggleView = () => setShowFavorites(!showFavorites);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
      setSearchTerm(e.target.value);

    const showEmptyState = data.length === 0 && !isLoading;

    return (
      <>
        <div className="mb-6 flex justify-between items-center flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2 items-center">
            <Button
              onClick={toggleView}
              variant={showFavorites ? "favorites" : "primary"}
            >
              {showFavorites ? "❤️ Favorites" : "🐱 All Cats"}
            </Button>

            <Input
              className="max-w-40"
              variant="primary"
              placeholder="Find by breed..."
              onChange={handleSearch}
              aria-label="Search cats by breed"
            />
          </div>

          {showFavorites && <FavoriteCounter count={data.length} />}
        </div>

        {showEmptyState && <EmptyStateMessage showFavorites={showFavorites} />}
      </>
    );
  },
);

export default CatHeader;
