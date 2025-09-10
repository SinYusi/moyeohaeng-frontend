import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../../../assets/images/search.svg";

interface SearchBarProps {
  map: kakao.maps.Map | null;
  onSubmitSearch: (keyword: string) => void;
  onPlaceSelect: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ map, onSubmitSearch, onPlaceSelect }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>(
    []
  );
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query || !map) {
      setPlaces([]);
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      query,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
        } else {
          setPlaces([]);
        }
      },
      { size: 15, page: 1 }
    );
  }, [query, map]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitSearch(query);
    setSubmitted(true);
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setSubmitted(false);
  };

  return (
    <form className="relative w-full max-w-lg" onSubmit={handleSubmit}>
      {/* 검색창 */}
      <div
        className={`flex items-center bg-white px-3 py-2 border shadow-sm transition-all
          ${
            isFocused
              ? "rounded-t-2xl border-gray-300"
              : "rounded-full border-gray-300"
          }`}
      >
        <img
          src={searchIcon}
          alt="search"
          className="w-5 h-5 text-gray-400 mr-2"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="장소, 주소 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full outline-none bg-transparent text-gray-700"
        />
      </div>

      {/* 드롭다운 */}
      {isFocused && !submitted && (
        <div className="absolute w-full bg-white rounded-b-2xl border border-t-0 border-gray-300 shadow-lg max-h-60 overflow-y-auto">
          {places.length > 0 ? (
            places.map((place) => (
              <div
                key={place.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                onMouseDown={() => {
                  setQuery(place.place_name); // 클릭 시 검색창에 반영
                  onPlaceSelect(place); // 지도 이동을 위한 콜백 호출
                  setIsFocused(false); // 드롭다운 닫기
                }}
              >
                <div className="font-medium">{place.place_name}</div>
                <div className="text-xs text-gray-500">
                  {place.address_name}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400 text-sm">
              검색어를 입력해주세요.
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
