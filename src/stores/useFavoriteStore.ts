import { create } from "zustand";
import type { MapPin } from "../types/planTypes";

interface FavoriteStore {
  favorites: MapPin[];
  addFavorite: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  removeFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
  toggleFavorite: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

export const useFavoriteStore = create<FavoriteStore>()((set, get) => ({
  favorites: [],

  addFavorite: (place) => {
    const favoritePlace: MapPin = {
      id: place.id || Date.now() + Math.random().toString(),
      address: place.road_address_name || place.address_name || "",
      latitude: Number(place.y),
      longitude: Number(place.x),
      detailLink: `https://place.map.kakao.com/${place.id}`,
      author: "unknown",
      category: place.category_group_name || "장소",
    };

    set((state) => ({
      favorites: [...state.favorites, favoritePlace],
    }));
  },

  removeFavorite: (placeId) => {
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== placeId),
    }));
  },

  isFavorite: (placeId) => {
    return get().favorites.some((fav) => fav.id === placeId.toString());
  },

  toggleFavorite: (place) => {
    const placeId = place.id || Date.now() + Math.random().toString();
    const { isFavorite, addFavorite, removeFavorite } = get();

    if (isFavorite(placeId.toString())) {
      removeFavorite(placeId.toString());
    } else {
      addFavorite(place);
    }
  },
}));
