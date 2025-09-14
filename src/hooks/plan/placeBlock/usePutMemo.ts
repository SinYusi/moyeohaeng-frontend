import { useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";

const usePutMemo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const putMemo = async (placeBlockId: string, memo: string) => {
    if (!projectId) {
      console.error("projectId를 찾을 수 없습니다.");
      setError("projectId를 찾을 수 없습니다.");
      return;
    }

    if (!placeBlockId) {
      console.error("placeBlockId를 찾을 수 없습니다.");
      setError("placeBlockId를 찾을 수 없습니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await baseService.put(
        `/v1/projects/${projectId}/place-blocks/${placeBlockId}/memo`,
        {
          memo,
        }
      );
      return response.data;
    } catch (error) {
      console.error("메모 수정 에러:", error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { putMemo, loading, error };
};

export default usePutMemo;
