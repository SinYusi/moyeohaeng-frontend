import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState } from "react";
import SearchBar from "./SearchBar";
import getDistance from "../../../utils/getDistance";
import BasePin from "./BasePin";
import InfoOverlay from "./InfoOverlay";
import { useFavoriteStore } from "../../../stores/useFavoriteStore";
import FavoritePin from "./FavoritePin";

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

  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (categoryName: string) => {
    const category = categoryName?.split(" > ")[0] || "";
    const iconMap: { [key: string]: string } = {
      카페: "☕",
      음식점: "🍽️",
      병원: "🏥",
      약국: "💊",
      은행: "🏦",
      주유소: "⛽",
      주차장: "🅿️",
      지하철역: "🚇",
      학교: "🏫",
      학원: "📚",
      편의점: "🏪",
      마트: "🛒",
      문화시설: "🎭",
      관광명소: "🏛️",
      숙박: "🏨",
      공공기관: "🏛️",
      중개업소: "🏠",
    };
    return iconMap[category] || "📍";
  };

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
            console.log(position);
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
            // 주변에 장소가 없을 때는 아무것도 하지 않음 (오버레이 표시 안함)
          }
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          radius: 10, // 반경을 10m로 설정
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
        {searchResults.map((place, index) => (
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
        {favorites.map((favorite) => (
          <CustomOverlayMap
            key={`favorite-${favorite.id}`}
            position={{ lat: favorite.latitude, lng: favorite.longitude }}
            yAnchor={0.5}
            xAnchor={0.5}
            zIndex={1001}
          >
            <FavoritePin />
          </CustomOverlayMap>
        ))}
        {clickedPlace && (
          <CustomOverlayMap
            position={clickedPlace.position}
            yAnchor={1.05}
            xAnchor={0.5}
            zIndex={1002}
          >
            <InfoOverlay
              clickedPlace={clickedPlace}
              getCategoryIcon={getCategoryIcon}
            />
          </CustomOverlayMap>
        )}
      </Map>
      <div className="absolute top-5 left-4 right-4 z-10 flex justify-center">
        <SearchBar map={map} onSubmitSearch={handleSearchSubmit} />
      </div>
    </div>
  );
};

export default MapSection;
