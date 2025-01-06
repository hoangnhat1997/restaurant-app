import { RestaurantResponse } from "@/models/restaurant-response";
import React from "react";

const RestaurantItem = (restaurant: RestaurantResponse) => {
  return (
    <div>
      <div key={restaurant.id}>
        <h2>{restaurant.name}</h2>
        <p>{restaurant.desc}</p>
        <img src={restaurant.images[0]} alt={restaurant.name} />
        <button onClick={() => {}}>
          {restaurant.isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default RestaurantItem;
