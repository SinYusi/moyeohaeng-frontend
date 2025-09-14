import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";
import { useState } from "react";

interface GroupMemoResponse {
  status: number;
  message: string;
}

const usePutGroupMemo = () => {
  const projectId = useParams().id;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putGroupMemo = async (placeGroupId: string, memo: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await baseService.put<GroupMemoResponse>(
        `/v1/projects/${projectId}/place-groups/${placeGroupId}/memo`,
        { memo }
      );
      return response.data;
    } catch (error) {
      console.error("그룹 메모 수정 실패:", error);
      setError(error as string);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { putGroupMemo, isLoading, error };
};

export default usePutGroupMemo;
