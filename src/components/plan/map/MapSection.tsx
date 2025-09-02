import { Map } from "react-kakao-maps-sdk";
import { useState } from "react";
import SearchBar from "./SearchBar";

const MapSection = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const handleSearchSubmit = (keyword: string) => {
    if (!map || !keyword) return;

    const ps = new kakao.maps.services.Places();

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

            new kakao.maps.CustomOverlay({
              position,
              content: `<div style="
                width: 15px;
                height: 15px;
                background-color: yellow;
                border: 2px solid black;
                border-radius: 50%;
              "></div>`,
              map,
            });

            bounds.extend(position);
          });

          map.setBounds(bounds);
        } else {
          alert("검색 결과가 없습니다.");
        }
      },
      { bounds: map.getBounds() }
    );
  };

  return (
    <div className="w-full h-full relative">
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
        onCreate={setMap}
      />
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-center">
        <SearchBar map={map} onSubmitSearch={handleSearchSubmit} />
      </div>
    </div>
  );
};

export default MapSection;
