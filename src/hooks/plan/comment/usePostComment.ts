import { useState } from "react";
import { useParams } from "react-router-dom";
import baseService from "../../../service/baseService";

const usePostComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const projectId = useParams().id;

  const postComment = async (placeBlockId: string, content: string) => {
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

    if (!content) {
      console.error("comment를 찾을 수 없습니다.");
      setError("comment를 찾을 수 없습니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await baseService.post(
        `/v1/projects/${projectId}/place-blocks/${placeBlockId}/comments`,
        {
          content,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { postComment, loading, error };
};

export default usePostComment;
