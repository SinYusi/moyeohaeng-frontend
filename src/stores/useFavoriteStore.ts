import { create } from "zustand";
import type { MapPin } from "../types/planTypes";
import useAuthStore from "./useAuthStore";

interface FavoriteStore {
  favorites: MapPin[];
  addFavorite: (
    place: kakao.maps.services.PlacesSearchResultItem,
    postPinId: string,
    serverPlaceId: string
  ) => void;
  addAllFavorites: (places: MapPin[]) => void;
  removeFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
  getFavorite: (placeId: string) => MapPin | undefined;
}

export const useFavoriteStore = create<FavoriteStore>()((set, get) => ({
  favorites: [],

  addFavorite: (place, postPinId, serverPlaceId) => {
    const email = useAuthStore.getState().email;
    const favoritePlace: MapPin = {
      author: email || "",
      id: postPinId,
      place: {
        id: serverPlaceId,
        name: place.place_name || "",
        address: place.road_address_name || place.address_name || "",
        latitude: Number(place.y),
        longitude: Number(place.x),
        detailLink: `https://place.map.kakao.com/${place.id}`,
        category: place.category_group_name || "기타",
        author: email || "",
      },
    };

    set((state) => ({
      favorites: [...state.favorites, favoritePlace],
    }));
  },

  addAllFavorites: (pins) => {
    set(() => ({
      favorites: [...pins],
    }));
  },

  removeFavorite: (serverId) => {
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== serverId),
    }));
  },

  isFavorite: (placeId) => {
    return get().favorites.some(
      (fav) => fav.place.detailLink.split("/").pop() === placeId.toString()
    );
  },

  getFavorite: (placeId) => {
    return get().favorites.find(
      (fav) => fav.place.detailLink.split("/").pop() === placeId.toString()
    );
  },
}));
