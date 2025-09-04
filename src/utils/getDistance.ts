const getDistance = (pos1: kakao.maps.LatLng, pos2: kakao.maps.LatLng) => {
  const lat1 = pos1.getLat();
  const lng1 = pos1.getLng();
  const lat2 = pos2.getLat();
  const lng2 = pos2.getLng();

  const R = 6371; // 지구 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // 미터로 반환
};

export default getDistance;
