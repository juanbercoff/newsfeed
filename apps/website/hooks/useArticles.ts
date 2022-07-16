import {
  GetOneArticlePayload,
  ArticlesWithLikesResponseDto,
  CreateArticleDto,
  UpdateArticleDto,
} from '@newsfeed/data';
import {
  getOneArticle,
  getArticlesList,
  createArticle,
  getUserArticles,
  updateArticle,
  deleteArticle,
} from '../services/articles-api';
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from 'react-query';
import { toast } from 'react-toastify';

export function useGetArticles(
  initialData: ArticlesWithLikesResponseDto[],
  tagsFilter?: string
) {
  return useInfiniteQuery(
    ['articles', tagsFilter],
    ({ pageParam = '' }) =>
      getArticlesList({ cursor: pageParam, tags: tagsFilter }),
    {
      getNextPageParam: (lastPage) =>
        lastPage[lastPage.length - 1]?.id ?? undefined,
      refetchOnMount: false,
    }
  );
}

export function useGetOneArticle(
  articleId: GetOneArticlePayload,
  initialData?: ArticlesWithLikesResponseDto,
  enabled?: boolean
) {
  return useQuery(['articles', articleId], () => getOneArticle(articleId), {
    initialData,
    enabled: enabled,
  });
}

export function useCreateArticle(onSuccess: (url: string) => Promise<boolean>) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, authToken }: { data: CreateArticleDto; authToken: string }) =>
      createArticle(data, authToken),
    {
      onSuccess: () => {
        toast.success('Articulo creado con exito');
        onSuccess('/feed');
        queryClient.invalidateQueries('articles', { refetchInactive: true });
      },
    }
  );
}

export function useGetUserArticles(authToken: string) {
  return useQuery(['articles', authToken], () => getUserArticles(authToken), {
    enabled: !!authToken,
  });
}

export function useUpdateArticle(onSuccess: (url: string) => Promise<boolean>) {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      data,
      articleId,
      authToken,
    }: {
      data: UpdateArticleDto;
      articleId: string;
      authToken: string;
    }) => updateArticle(articleId, data, authToken),
    {
      onSuccess: () => {
        queryClient.refetchQueries('articles');
        toast.success('Articulo modificado con exito');
        onSuccess('/feed');
      },
    }
  );
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ articleId, authToken }: { articleId: string; authToken: string }) =>
      deleteArticle(articleId, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
        toast.success('Articulo eliminado con exito');
      },
    }
  );
}
