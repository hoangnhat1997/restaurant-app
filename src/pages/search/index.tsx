import RestaurantItem from "@/components/RestaurantItem";
import { trpc } from "@/utils/trpc";
import { NextPageWithLayout } from "../_app";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useEffect, useState } from "react";
import { textByStoreCategory } from "@/utils/categories";
import { inferProcedureInput } from "@trpc/server";
import { AppRouter } from "@/server/routers/_app";
import { RestaurantResponse } from "@/models/restaurant-response";

const SearchPage: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    // Object.keys(textByStoreCategory)[0]
    null
  );

  const [restaurantData, setRestaurantData] = useState<RestaurantResponse[]>(
    []
  );

  const { data, fetchNextPage, hasNextPage, isLoading } =
    trpc.restaurant.list.useInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      }
    );

  useEffect(() => {
    if (data) {
      const allRestaurants = data.pages.flatMap((page) => page.items);
      setRestaurantData(allRestaurants);
    }
  }, [data]);

  const addPost = trpc.restaurant.add.useMutation({
    async onSuccess() {
      await utils.restaurant.list.invalidate();
    },
  });

  const toggleFavorite = (id: string, isFavorite: boolean) => {
    try {
      type Input = inferProcedureInput<AppRouter["restaurant"]["add"]>;
      const input: Input = {
        id: id as string,
        isFavorite: !isFavorite,
      };

      addPost.mutateAsync(input);

      setRestaurantData((prevData) =>
        prevData.map((restaurant) =>
          restaurant.id === id
            ? { ...restaurant, isFavorite: !isFavorite }
            : restaurant
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const utils = trpc.useUtils();

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);

    const filteredRestaurants = category
      ? data?.pages.flatMap((page) =>
          page.items.filter((restaurant) => restaurant.category === category)
        )
      : data?.pages.flatMap((page) => page.items);

    setRestaurantData(filteredRestaurants || []);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="mb-4">
        <div className="flex items-center bg-[#F8FBFC] rounded-lg">
          <FontAwesomeIcon
            className="mx-2"
            color="gray"
            icon={faMagnifyingGlass}
          />
          <input
            type="text"
            placeholder="맛집 이름을 검색해보세요"
            className="w-full p-3 bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide border-b pb-2">
        <button
          className={`shrink-0 px-4 py-2 rounded-xl font-bold ${
            selectedCategory === null ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          전체
        </button>
        {Object.entries(textByStoreCategory).map(([key, text]) => (
          <button
            key={key}
            className={`shrink-0 px-4 py-2 rounded-xl ${
              selectedCategory === key
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handleCategoryClick(key)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {restaurantData.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            desc={restaurant.desc}
            images={restaurant.images}
            isFavorite={restaurant.isFavorite}
            onFavorite={() =>
              toggleFavorite(restaurant.id, restaurant.isFavorite)
            }
            location={restaurant.city}
            price={restaurant.price_range}
            rating={restaurant.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
