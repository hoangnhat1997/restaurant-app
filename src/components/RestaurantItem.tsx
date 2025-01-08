import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import React from "react";
interface RestaurantItemProps {
  id: string;
  name: string;
  desc: string;
  location: string;
  price: string;
  rating: number;
  images: string[];
  isFavorite: boolean;
  onFavorite: () => void;
}
const RestaurantItem = ({
  id,
  name,
  desc,
  location,
  price,
  rating,
  images,
  isFavorite,
  onFavorite,
}: RestaurantItemProps) => {
  return (
    <div key={id} className="border rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={images[0]}
          alt={name}
          width={400}
          height={200}
          className="w-full h-48 object-cover border-b rounded-lg"
        />
        <button
          onClick={onFavorite}
          className="absolute top-2 right-2 bg-white bg-opacity-50 rounded-full"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full">
            {isFavorite ? (
              <FontAwesomeIcon color="red" icon={faHeartSolid} />
            ) : (
              <FontAwesomeIcon color="white" icon={faHeartRegular} />
            )}
          </div>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-sm text-[#E4906C] font-semibold">{name}</h3>
        <div className="flex items-between justify-between">
          <p className="text-lg text-black font-bold">{desc}</p>
          <div>
            <FontAwesomeIcon className="mx-2" color="orange" icon={faStar} />
            <span className="text-gray-500 font-bold">{rating}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500 font-semibold">
          {price + "만원"}
        </p>
      </div>
    </div>
  );
};

export default RestaurantItem;
