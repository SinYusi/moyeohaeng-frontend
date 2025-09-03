import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState } from "react";
import SearchBar from "./SearchBar";
import getDistance from "../../../utils/getDistance";
import BasePin from "./BasePin";
import InfoOverlay from "./InfoOverlay";
import { useFavoriteStore } from "../../../stores/useFavoriteStore";
import FavoritePin from "./FavoritePin";
import CategoryFilterBtns from "./CategoryFilterBtns";

const MapSection = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [clickedPlace, setClickedPlace] = useState<{
    position: { lat: number; lng: number };
    place: kakao.maps.services.PlacesSearchResultItem;
    distance: number;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]);
  const { favorites } = useFavoriteStore();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const categories = [
    "MT1", // 대형마트
    "CS2", // 편의점
    "PS3", // 어린이집, 유치원
    "SC4", // 학교
    "AC5", // 학원
    "PK6", // 주차장
    "OL7", // 주유소, 충전소
    "SW8", // 지하철역
    "BK9", // 은행
    "CT1", // 문화시설
    "AG2", // 중개업소
    "PO3", // 공공기관
    "AT4", // 관광명소
    "AD5", // 숙박
    "FD6", // 음식점
    "CE7", // 카페
    "HP8", // 병원
    "PM9", // 약국
  ] as const;
  const ps = new kakao.maps.services.Places();

  const handleSearchSubmit = (keyword: string) => {
    if (!map || !keyword) return;
    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          data.forEach((place) => {
            const position = new kakao.maps.LatLng(
              Number(place.y),
              Number(place.x)
            );
            bounds.extend(position);
          });
          map.setBounds(bounds);
          // 검색 결과를 state에 저장
          setSearchResults(data);
        } else {
          alert("검색 결과가 없습니다.");
          setSearchResults([]);
        }
      },
      { bounds: map.getBounds() }
    );
  };

  const searchNearby = (lat: number, lng: number) => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();
    const allResults: kakao.maps.services.PlacesSearchResultItem[] = [];
    let completedSearches = 0;

    // 모든 카테고리 반복해서 검색
    categories.forEach((category) => {
      ps.categorySearch(
        category,
        (result, status) => {
          completedSearches++;

          if (status === kakao.maps.services.Status.OK && result.length > 0) {
            allResults.push(...result);
          }

          // 모든 카테고리 검색이 완료되면 가장 가까운 장소 선택
          if (completedSearches === categories.length) {
            if (allResults.length > 0) {
              // 클릭한 위치에서 가장 가까운 장소 찾기
              const clickPosition = new kakao.maps.LatLng(lat, lng);
              let closestPlace = allResults[0];
              let minDistance = getDistance(
                clickPosition,
                new kakao.maps.LatLng(+closestPlace.y, +closestPlace.x)
              );

              allResults.forEach((place) => {
                const placePosition = new kakao.maps.LatLng(+place.y, +place.x);
                const distance = getDistance(clickPosition, placePosition);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestPlace = place;
                }
              });

              // 장소가 있을 때만 오버레이 표시 (가장 가까운 장소의 위치에)
              setClickedPlace({
                position: {
                  lat: Number(closestPlace.y),
                  lng: Number(closestPlace.x),
                },
                place: closestPlace,
                distance: minDistance,
              });
            }
          }
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          radius: 5, // 반경을 10m로 설정
        }
      );
    });
  };

  return (
    <div className="w-full h-full relative">
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
        onCreate={setMap}
        onClick={(_, mouseEvent) => {
          const lat = mouseEvent.latLng.getLat();
          const lng = mouseEvent.latLng.getLng();
          searchNearby(lat, lng);
        }}
      >
        {searchResults
          .filter((place) => {
            const placeId =
              place.id || `${place.place_name}-${place.x}-${place.y}`;
            return !favorites.some((fav) => fav.id === placeId);
          })
          .map((place, index) => (
            <CustomOverlayMap
              key={`search-${place.id || place.place_name}-${index}`}
              position={{ lat: Number(place.y), lng: Number(place.x) }}
              yAnchor={0.5}
              xAnchor={0.5}
              zIndex={1000}
            >
              <BasePin />
            </CustomOverlayMap>
          ))}
        {favorites.map((favorite) => {
          const isFiltered =
            selectedFilters.length === 0 ||
            selectedFilters.includes(favorite.category);
          return (
            <CustomOverlayMap
              key={`favorite-${favorite.id}`}
              position={{ lat: favorite.latitude, lng: favorite.longitude }}
              yAnchor={0.5}
              xAnchor={0.5}
              zIndex={1001}
            >
              <div
                className={`transition-opacity duration-200 ${
                  isFiltered ? "opacity-100" : "opacity-50"
                }`}
              >
                <FavoritePin />
              </div>
            </CustomOverlayMap>
          );
        })}
        {clickedPlace && (
          <CustomOverlayMap
            position={clickedPlace.position}
            yAnchor={1.15}
            xAnchor={0.5}
            zIndex={1002}
          >
            <InfoOverlay
              clickedPlace={clickedPlace}
              onClose={() => setClickedPlace(null)}
            />
          </CustomOverlayMap>
        )}
      </Map>

      {/* 맵 상단 부분 */}
      <div className="absolute top-5 left-4 right-4 z-10 flex flex-col items-center gap-3">
        <SearchBar map={map} onSubmitSearch={handleSearchSubmit} />
        <CategoryFilterBtns
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
    </div>
  );
};

export default MapSection;
