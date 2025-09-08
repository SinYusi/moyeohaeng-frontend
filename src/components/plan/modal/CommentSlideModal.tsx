import SlideModal from "../SlideModal";
import { useModalStore } from "../../../stores/useModalStore";
import { useSpotCollectionStore } from "../../../stores/useSpotCollectionStore";

const CommentSlideModal = () => {
  const { modalData } = useModalStore();
  const { id } = modalData;
  const { getPlaceById } = useSpotCollectionStore();
  if (!id) return <p>placeId를 불러올 수 없습니다.</p>;
  const place = getPlaceById(id.toString());
  return <SlideModal>{place?.name}</SlideModal>;
};

export default CommentSlideModal;
