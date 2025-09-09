import { create } from "zustand";
import type { MapPin } from "../types/planTypes";
import useAuthStore from "./useAuthStore";

interface FavoriteStore {
  favorites: MapPin[];
  addFavorite: (
    place: kakao.maps.services.PlacesSearchResultItem,
    postPinId: string
  ) => void;
  addAllFavorites: (places: MapPin[]) => void;
  removeFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
  getFavorite: (placeId: string) => MapPin | undefined;
}

export const useFavoriteStore = create<FavoriteStore>()((set, get) => ({
  favorites: [],

  addFavorite: (place, postPinId) => {
    const email = useAuthStore.getState().email;
    const favoritePlace: MapPin = {
      id: postPinId,
      address: place.road_address_name || place.address_name || "",
      latitude: Number(place.y),
      longitude: Number(place.x),
      detailLink: `https://place.map.kakao.com/${place.id}`,
      author: email || "",
      category: place.category_group_name || "장소",
      name: place.place_name || "",
    };

    set((state) => ({
      favorites: [...state.favorites, favoritePlace],
    }));
  },

  addAllFavorites: (places) => {
    set(() => ({
      favorites: [...places],
    }));
  },

  removeFavorite: (placeId) => {
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== placeId),
    }));
  },

  isFavorite: (placeId) => {
    return get().favorites.some(
      (fav) => fav.detailLink.split("/").pop() === placeId.toString()
    );
  },

  getFavorite: (placeId) => {
    return get().favorites.find(
      (fav) => fav.detailLink.split("/").pop() === placeId.toString()
    );
  },
}));
