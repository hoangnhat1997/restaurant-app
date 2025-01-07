import RestaurantItem from "@/components/RestaurantItem";
import { trpc } from "@/utils/trpc";
import { NextPageWithLayout } from "../_app";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RestaurantList: NextPageWithLayout = () => {
  const restaurantsQuery = trpc.post.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    }
  );
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="mb-4">
        <div className="flex items-center border rounded-lg">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {restaurantsQuery.data?.pages.map((page) =>
          page.items.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              desc={restaurant.desc}
              images={restaurant.images}
              isFavorite={restaurant.isFavorite}
              onFavorite={() => {
                // toggleFavorite(restaurant.id);
              }}
              location={restaurant.city}
              price={restaurant.price_range}
              rating={restaurant.rating}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
