import { Map } from "react-kakao-maps-sdk";

const MapSection = () => {
  return (
    <div className="w-full h-full relative">
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      />
    </div>
  );
};

export default MapSection;
