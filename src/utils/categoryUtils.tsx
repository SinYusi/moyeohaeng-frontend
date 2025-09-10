import React from "react";
import AncientGate from "../assets/images/AncientGate.svg";
import BuildingLibrary from "../assets/images/BuildingLibrary.svg";
import BuildingOffice from "../assets/images/BuildingOffice.svg";
import Cafe from "../assets/images/Cafe.svg";
import CurrencyWon from "../assets/images/CurrencyWon.svg";
import ForkSpoon from "../assets/images/ForkSpoon.svg";
import GasPump from "../assets/images/GasPump.svg";
import HospitalSvg from "../assets/images/Hospital.svg";
import HouseUser from "../assets/images/HouseUser.svg";
import Institution from "../assets/images/Institution.svg";
import Parking from "../assets/images/Parking.svg";
import Pills from "../assets/images/Pills.svg";
import SchoolSvg from "../assets/images/School.svg";
import ShoppingBasket from "../assets/images/ShoppingBasket.svg";
import StoreAlt from "../assets/images/StoreAlt.svg";
import Subway from "../assets/images/Subway.svg";
import TickerStar from "../assets/images/TickerStar.svg";
import ChildrenToy from "../assets/images/ChildrenToy.svg";

export const getCategoryIcon = (categoryName: string, size: number) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    음식점: <img src={ForkSpoon} alt="음식점" width={size} height={size} />,
    카페: <img src={Cafe} alt="카페" width={size} height={size} />,
    관광명소: (
      <img src={AncientGate} alt="관광명소" width={size} height={size} />
    ),
    숙박: <img src={HouseUser} alt="숙박" width={size} height={size} />,
    문화시설: (
      <img src={TickerStar} alt="문화시설" width={size} height={size} />
    ),
    대형마트: (
      <img src={ShoppingBasket} alt="대형마트" width={size} height={size} />
    ),
    공공기관: (
      <img src={Institution} alt="공공기관" width={size} height={size} />
    ),
    중개업소: (
      <img src={BuildingOffice} alt="중개업소" width={size} height={size} />
    ),
    병원: <img src={HospitalSvg} alt="병원" width={size} height={size} />,
    약국: <img src={Pills} alt="약국" width={size} height={size} />,
    지하철역: <img src={Subway} alt="지하철역" width={size} height={size} />,
    주차장: <img src={Parking} alt="주차장" width={size} height={size} />,
    "주유소,충전소": (
      <img src={GasPump} alt="주유소" width={size} height={size} />
    ),
    은행: <img src={CurrencyWon} alt="은행" width={size} height={size} />,
    편의점: <img src={StoreAlt} alt="편의점" width={size} height={size} />,
    학교: <img src={SchoolSvg} alt="학교" width={size} height={size} />,
    학원: <img src={BuildingLibrary} alt="학원" width={size} height={size} />,
    어린이집: (
      <img src={ChildrenToy} alt="어린이집" width={size} height={size} />
    ),
  };
  return iconMap[categoryName] || "📍";
};
