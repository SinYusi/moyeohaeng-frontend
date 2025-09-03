import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoritePlace {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  detailLink: string;
  category: string;
  addedAt: number;
}

interface FavoriteStore {
  favorites: FavoritePlace[];
  addFavorite: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  removeFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
  toggleFavorite: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (place) => {
        const favoritePlace: FavoritePlace = {
          id: place.id || `${place.place_name}-${place.x}-${place.y}`,
          address: place.road_address_name || place.address_name || '',
          latitude: Number(place.y),
          longitude: Number(place.x),
          detailLink: `https://example.com/pin/${place.id || 'unknown'}`,
          category: place.category_name?.split(' > ')[0] || '장소',
          addedAt: Date.now(),
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
        return get().favorites.some((fav) => fav.id === placeId);
      },
      
      toggleFavorite: (place) => {
        const placeId = place.id || `${place.place_name}-${place.x}-${place.y}`;
        const { isFavorite, addFavorite, removeFavorite } = get();
        
        if (isFavorite(placeId)) {
          removeFavorite(placeId);
        } else {
          addFavorite(place);
        }
      },
    }),
    {
      name: 'favorite-places',
    }
  )
);
