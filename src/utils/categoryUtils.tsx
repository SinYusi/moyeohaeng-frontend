import {
  Coffee,
  Utensils,
  Hospital,
  Pill,
  CreditCard,
  Fuel,
  SquareParking,
  TramFront,
  School,
  LibraryBig,
  Store,
  ShoppingCart,
  Drama,
  Pyramid,
  Bed,
  Landmark,
  House,
} from "lucide-react";

export const getCategoryIcon = (
  categoryName: string,
  size: number,
  color: string
) => {
  const category = categoryName?.split(" > ")[0] || "";
  const iconMap: { [key: string]: React.ReactNode } = {
    카페: <Coffee size={size} color={color} />,
    음식점: <Utensils size={size} color={color} />,
    병원: <Hospital size={size} color={color} />,
    약국: <Pill size={size} color={color} />,
    은행: <CreditCard size={size} color={color} />,
    "주유소,충전소": <Fuel size={size} color={color} />,
    주차장: <SquareParking size={size} color={color} />,
    지하철역: <TramFront size={size} color={color} />,
    학교: <School size={size} color={color} />,
    학원: <LibraryBig size={size} color={color} />,
    편의점: <Store size={size} color={color} />,
    대형마트: <ShoppingCart size={size} color={color} />,
    문화시설: <Drama size={size} color={color} />,
    관광명소: <Pyramid size={size} color={color} />,
    숙박: <Bed size={size} color={color} />,
    공공기관: <Landmark size={size} color={color} />,
    중개업소: <House size={size} color={color} />,
  };
  return iconMap[category] || "📍";
};
