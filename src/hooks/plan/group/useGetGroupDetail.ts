import { useCallback, useState } from "react";
import type { PlaceBlock } from "../../../types/planTypes";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";

interface GetGroupDetailResponse {
  status: number;
  message: string;
  data: {
    id: string;
    name: string;
    placeBlocks: PlaceBlock[];
  };
}

const useGetGroupDetail = () => {
  const [groupDetail, setGroupDetail] = useState<
    GetGroupDetailResponse["data"] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const getGroupDetail = useCallback(
    async (placeGroupId: string) => {
      if (!projectId) {
        setError("프로젝트 ID가 없습니다.");
        return;
      }

      if (!placeGroupId) {
        setError("그룹 ID가 없습니다.");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await baseService.get<GetGroupDetailResponse>(
          `/v1/projects/${projectId}/place-groups/${placeGroupId}`
        );
        setGroupDetail(response.data.data);
        return response.data.data;
      } catch (error) {
        console.error("그룹 상세 정보 조회 실패", error);
        setError(error as string);
        setGroupDetail(null);
      } finally {
        setIsLoading(false);
      }
    },
    [projectId]
  );

  return { groupDetail, isLoading, error, getGroupDetail };
};

export default useGetGroupDetail;
