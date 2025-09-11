import { useCallback, useEffect, useState } from "react";
import baseService from "../../../service/baseService";
import { useParams } from "react-router-dom";
import type { Comment } from "../../../types/planTypes";

interface GetCommentResponse {
  data: Comment[];
  message: string;
  status: number;
}

const useGetComment = ({ placeBlockId }: { placeBlockId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams<{ id: string }>();
  const getComment = useCallback(async () => {
    if (!id) {
      console.error("projectId is not defined");
      return;
    }
    if (!placeBlockId) {
      console.error("placeBlockId is not defined");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await baseService.get<GetCommentResponse>(
        `/v1/projects/${id}/place-blocks/${placeBlockId}/comments`
      );
      setComments(response.data.data);
    } catch (error) {
      console.error("get comment error", error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [id, placeBlockId]);

  useEffect(() => {
    getComment();
  }, [getComment]);
  return { comments, getComment, loading, error };
};

export default useGetComment;
