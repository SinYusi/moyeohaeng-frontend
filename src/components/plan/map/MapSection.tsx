import { Map } from "react-kakao-maps-sdk";
import { useState } from "react";
import SearchBar from "./SearchBar";
import getDistance from "../../../utils/getDistance";

const MapSection = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [_, setSearchOverlays] = useState<kakao.maps.CustomOverlay | null>(
    null
  );
  const [currentOverlay, setCurrentOverlay] =
    useState<kakao.maps.CustomOverlay | null>(null); // 현재 오버레이 상태
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
            console.log(position);
            const overlay = new kakao.maps.CustomOverlay({
              position,
              content:
                '<div style=" width: 15px; height: 15px; background-color: #fee500; border: 1px solid black; border-radius: 50%; "></div>',
              map,
              xAnchor: 0.5,
              yAnchor: 0.5,
            });
            bounds.extend(position);
            currentOverlay && currentOverlay.setMap(null);
            setSearchOverlays(overlay);
          });
          map.setBounds(bounds);
        } else {
          alert("검색 결과가 없습니다.");
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

              showOverlay(closestPlace);
            }
          }
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          radius: 30, // 반경을 30m로 설정
        }
      );
    });
  };

  const showOverlay = (place: kakao.maps.services.PlacesSearchResultItem) => {
    if (!map) return;

    // 이전 오버레이 제거
    if (currentOverlay) currentOverlay.setMap(null);

    const content = `
      <div style="padding:10px; background:white; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.3)">
        <strong>${place.place_name}</strong><br/>
        ${place.category_name}<br/>
        ${place.road_address_name || place.address_name}<br/>
        ${place.phone}
      </div>
    `;

    const overlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(+place.y, +place.x),
      content,
      yAnchor: 1,
    });

    overlay.setMap(map);

    // 새 오버레이 상태 저장
    setCurrentOverlay(overlay);
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
      />
      <div className="absolute top-5 left-4 right-4 z-10 flex justify-center">
        <SearchBar map={map} onSubmitSearch={handleSearchSubmit} />
      </div>
    </div>
  );
};

export default MapSection;
