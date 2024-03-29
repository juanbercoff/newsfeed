import {
  GetOneArticlePayload,
  ArticlesResponseDto,
  ArticleResponseDto,
  CreateArticleDto,
  UpdateArticleDto,
  GetArticleCondition,
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
import Utils from '../utils/Utils';

export function useGetArticles(
  initialData: ArticlesResponseDto[],
  condition: GetArticleCondition,
  tagsFilter?: string
) {
  return useInfiniteQuery(
    ['articles', tagsFilter, condition],
    ({ pageParam = 1 }) =>
      getArticlesList({ cursor: pageParam, tags: tagsFilter, condition }),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length === 4 ? pages.length + 1 : undefined,
    }
  );
}

export function useGetOneArticle(
  articleId: GetOneArticlePayload,
  initialData?: ArticleResponseDto,
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
        localStorage.clear();
        queryClient.invalidateQueries('articles', { refetchInactive: true });
      },
      onError: (error) => {
        toast.error(Utils.handleError(error));
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
        queryClient.invalidateQueries('articles');
        onSuccess('/feed').then(() =>
          toast.success('Articulo modificado con exito')
        );
      },
      onError: (error) => {
        toast.error(Utils.handleError(error));
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
      onError: (error) => {
        toast.error(Utils.handleError(error));
      },
    }
  );
}
