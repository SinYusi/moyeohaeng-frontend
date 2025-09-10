import { Map, CustomOverlayMap, useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import getDistance from "../../../utils/getDistance";
import BasePin from "./BasePin";
import InfoOverlay from "./InfoOverlay";
import { useFavoriteStore } from "../../../stores/useFavoriteStore";
import FavoritePin from "./FavoritePin";
import CategoryFilterBtns from "../CategoryFilterBtns";
import useGetPins from "../../../hooks/plan/pin/useGetPins";
import type { Place } from "../../../types/planTypes";

const MapSection = () => {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_APP_KEY,
    libraries: ["services", "clusterer"],
  });
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [clickedPlace, setClickedPlace] = useState<{
    position: { lat: number; lng: number };
    kakaoPlace: kakao.maps.services.PlacesSearchResultItem;
    place?: Place;
    distance: number;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]);
  const { favorites, addAllFavorites } = useFavoriteStore();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const categories = [
    "FD6", // 음식점
    "CE7", // 카페
    "AT4", // 관광명소
    "AD5", // 숙박
    "CT1", // 문화시설
    "MT1", // 대형마트
    "PO3", // 공공기관
    "AG2", // 중개업소
    "HP8", // 병원
    "PM9", // 약국
    "SW8", // 지하철역
    "PK6", // 주차장
    "OL7", // 주유소, 충전소
    "BK9", // 은행
    "CS2", // 편의점
    "SC4", // 학교
    "AC5", // 학원
    "PS3", // 어린이집, 유치원
  ] as const;
  const { pins, loading: pinsLoading, error: pinsError } = useGetPins();

  useEffect(() => {
    addAllFavorites(pins);
  }, [pins]);

  if (loading || pinsLoading) return <div>Loading...</div>;
  if (error || pinsError) return <div>지도 로딩 중 오류 발생</div>;
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
      { size: 15, page: 1 }
    );
  };

  const handlePlaceSelect = (
    kakaoPlace: kakao.maps.services.PlacesSearchResultItem
  ) => {
    if (!map) return;

    // 선택된 장소로 지도 중심 이동
    const position = new kakao.maps.LatLng(
      Number(kakaoPlace.y),
      Number(kakaoPlace.x)
    );
    map.setCenter(position);
    map.setLevel(3); // 적절한 확대 레벨로 설정

    // 선택된 장소를 검색 결과에 추가하여 핀으로 표시
    setSearchResults([kakaoPlace]);
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

              allResults.forEach((_place) => {
                const placePosition = new kakao.maps.LatLng(
                  +_place.y,
                  +_place.x
                );
                const distance = getDistance(clickPosition, placePosition);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestPlace = _place;
                }
              });

              // 장소가 있을 때만 오버레이 표시 (가장 가까운 장소의 위치에)
              setClickedPlace({
                position: {
                  lat: Number(closestPlace.y),
                  lng: Number(closestPlace.x),
                },
                kakaoPlace: closestPlace,
                distance: minDistance,
              });
            }
          }
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          radius: 10,
        }
      );
    });
  };

  return (
    <div className="w-full h-full relative">
      <Map
        center={{ lat: 37.9339465490811, lng: 127.22633055710195 }}
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
          .filter((kakaoResultPlace) => {
            const placeId =
              kakaoResultPlace.id ||
              `${kakaoResultPlace.place_name}-${kakaoResultPlace.x}-${kakaoResultPlace.y}`;
            return !favorites.some((fav) => fav.id === placeId);
          })
          .map((kakaoResultPlace, index) => (
            <CustomOverlayMap
              key={`search-${
                kakaoResultPlace.id || kakaoResultPlace.place_name
              }-${index}`}
              position={{
                lat: Number(kakaoResultPlace.y),
                lng: Number(kakaoResultPlace.x),
              }}
              yAnchor={0.5}
              xAnchor={0.5}
              zIndex={1000}
            >
              <div
                onClick={() => {
                  new kakao.maps.LatLng(
                    Number(kakaoResultPlace.y),
                    Number(kakaoResultPlace.x)
                  );
                  const distance = 0;
                  setClickedPlace({
                    position: {
                      lat: Number(kakaoResultPlace.y),
                      lng: Number(kakaoResultPlace.x),
                    },
                    kakaoPlace: kakaoResultPlace,
                    distance: distance,
                  });
                }}
                onMouseDown={(e: React.MouseEvent) => {
                  e.stopPropagation();
                }}
                onMouseUp={(e: React.MouseEvent) => {
                  e.stopPropagation();
                }}
                style={{ cursor: "pointer" }}
              >
                <BasePin />
              </div>
            </CustomOverlayMap>
          ))}
        {favorites.map((favorite) => {
          const isFiltered =
            selectedFilters.length === 0 ||
            selectedFilters.includes(favorite.place.category);
          return (
            <CustomOverlayMap
              key={`favorite-${favorite.id}`}
              position={{
                lat: favorite.place.latitude,
                lng: favorite.place.longitude,
              }}
              yAnchor={0.5}
              xAnchor={0.5}
              zIndex={1001}
            >
              <div
                className={`transition-opacity duration-200 ${
                  isFiltered ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => {
                  const distance = 0;
                  const kakaoPlaceData: kakao.maps.services.PlacesSearchResultItem =
                    {
                      id: favorite.place.detailLink.split("/").pop() || "",
                      place_name: favorite.place.name,
                      address_name: favorite.place.address,
                      road_address_name: favorite.place.address,
                      x: favorite.place.longitude.toString(),
                      y: favorite.place.latitude.toString(),
                      place_url: favorite.place.detailLink,
                      category_group_name: favorite.place.category,
                      category_group_code: "",
                      category_name: favorite.place.category,
                      distance: "",
                      phone: "",
                    };

                  setClickedPlace({
                    position: {
                      lat: favorite.place.latitude,
                      lng: favorite.place.longitude,
                    },
                    kakaoPlace: kakaoPlaceData,
                    place: favorite.place,
                    distance: distance,
                  });
                }}
                onMouseDown={(e: React.MouseEvent) => {
                  e.stopPropagation();
                }}
                onMouseUp={(e: React.MouseEvent) => {
                  e.stopPropagation();
                }}
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
        <SearchBar
          map={map}
          onSubmitSearch={handleSearchSubmit}
          onPlaceSelect={handlePlaceSelect}
        />
        <CategoryFilterBtns
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          mode="favorite"
        />
      </div>
    </div>
  );
};

export default MapSection;
