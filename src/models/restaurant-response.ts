import { JsonValue } from "@prisma/client/runtime/library";

export interface RestaurantResponse {
  id: string;
  rating: number;
  rating_count: number;
  category: string;
  city: string;
  desc: string;
  images: string[];
  name: string;
  price_range: string;
  featured: JsonValue;
  isFavorite: boolean;
}
