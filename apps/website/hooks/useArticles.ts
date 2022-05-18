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
import useAuthToken from '../hooks/useAuthToken';
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
      initialData: {
        pages: [initialData],
        pageParams: [''],
      },
    }
  );
}

export function useGetOneArticle(
  articleId: GetOneArticlePayload,
  initialData?: ArticlesWithLikesResponseDto,
  enabled?: boolean
) {
  return useQuery(['article', articleId], () => getOneArticle(articleId), {
    initialData,
    enabled: enabled,
  });
}

export function useCreateArticle(onSuccess: (url: string) => Promise<boolean>) {
  const queryClient = useQueryClient();
  const { authToken } = useAuthToken();
  return useMutation(
    (data: CreateArticleDto) => createArticle(data, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
        toast.success('Articulo creado con exito');
        onSuccess('/feed');
      },
    }
  );
}

export function useGetUserArticles() {
  const { authToken } = useAuthToken();
  return useQuery(['articles', authToken], () => getUserArticles(authToken), {
    enabled: !!authToken,
  });
}

export function useUpdateArticle(
  articleId: string,
  onSuccess: (url: string) => Promise<boolean>
) {
  const queryClient = useQueryClient();
  const { authToken } = useAuthToken();
  return useMutation(
    (data: UpdateArticleDto) => updateArticle(articleId, data, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
        toast.success('Articulo modificado con exito');
        onSuccess('/feed');
      },
    }
  );
}

export function useDeleteArticle(articleId: string) {
  const queryClient = useQueryClient();
  const { authToken } = useAuthToken();
  return useMutation(() => deleteArticle(articleId, authToken), {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      toast.success('Articulo eliminado con exito');
    },
  });
}
