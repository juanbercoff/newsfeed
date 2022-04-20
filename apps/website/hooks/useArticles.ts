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
} from '../services/articles-api';
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from 'react-query';
import useAuthToken from '../hooks/useAuthToken';
import { toast } from 'react-toastify';

export function useGetArticles(initialData: ArticlesWithLikesResponseDto[]) {
  return useInfiniteQuery(
    'articles',
    ({ pageParam = '' }) => getArticlesList({ cursor: pageParam }),
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

export function useCreateArticle() {
  const queryClient = useQueryClient();
  const { authToken } = useAuthToken();
  return useMutation(
    (data: CreateArticleDto) => createArticle(data, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
        toast.success('Articulo creado con exito');
      },
    }
  );
}

export function useGetUserArticles() {
  const { authToken } = useAuthToken();
  return useQuery(
    ['articlesByUser', authToken],
    () => getUserArticles(authToken),
    {
      enabled: !!authToken,
    }
  );
}

export function useUpdateArticle(articleId: string) {
  const queryClient = useQueryClient();
  const { authToken } = useAuthToken();
  return useMutation(
    (data: UpdateArticleDto) => updateArticle(articleId, data, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
        toast.success('Articulo modificado con exito');
      },
    }
  );
}
