import { useState, useEffect } from 'react';
import { useUserProfileContext } from '../contexts/user-context';

const useLikes = <T extends { id: string; like: number }>(
  entityId: string,
  countOfLikes: number,
  getFunction: (id: string, authToken: string) => Promise<T>,
  deleteFunction: (id: string, authToken: string) => Promise<T>,
  postFunction: (
    { id, like }: { id: string; like: boolean },
    authToken: string
  ) => Promise<T>
) => {
  const { authToken } = useUserProfileContext();
  const [uiLikes, setUiLikes] = useState(countOfLikes || 0);
  const [hasBeenLiked, setHasBeenLiked] = useState<T | null>(null);

  useEffect(() => {
    if (authToken) {
      (async () => {
        const articleLike = await getFunction(entityId, authToken);
        setHasBeenLiked(articleLike);
      })();
    }
  }, [getFunction, authToken, entityId]);

  const handleLike = async (like: boolean) => {
    const likeValue = like ? 1 : -1;
    if (hasBeenLiked && hasBeenLiked.like === likeValue) {
      await deleteFunction(hasBeenLiked.id, authToken);
      setUiLikes(uiLikes + -likeValue);
      return setHasBeenLiked(null);
    } else {
      const articleLike = await postFunction({ id: entityId, like }, authToken);
      setUiLikes(hasBeenLiked ? uiLikes + 2 * likeValue : uiLikes + likeValue);
      setHasBeenLiked(articleLike);
    }
  };

  return {
    uiLikes,
    hasBeenLiked,
    handleLike,
  };
};

export default useLikes;
