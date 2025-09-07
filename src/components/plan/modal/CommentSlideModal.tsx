import SlideModal from "../SlideModal";
import { useModalStore } from "../../../stores/useModalStore";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";

const CommentSlideModal = () => {
  const { modalData } = useModalStore();
  const { placeId } = modalData;
  const { getPlaceById } = useSpotCollectionStore();
  if (!placeId) return <p>placeId를 불러올 수 없습니다.</p>;
  const place = getPlaceById(placeId);
  return <SlideModal>{place?.placeName}</SlideModal>;
};

export default CommentSlideModal;
