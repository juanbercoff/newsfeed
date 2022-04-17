import {
  GetOneArticlePayload,
  ArticlesWithLikesResponseDto,
  CreateArticleDto,
} from '@newsfeed/data';
import {
  getOneArticle,
  getArticlesList,
  createArticle,
  getUserArticles,
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
  initialData?: ArticlesWithLikesResponseDto
) {
  return useQuery(['article', articleId], () => getOneArticle(articleId), {
    initialData,
  });
}

export function useCreateArticle(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const { authToken } = useAuthToken();
  return useMutation(
    (data: CreateArticleDto) => createArticle(data, authToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
        toast.success('Articulo creado con exito');
        onSuccess();
      },
    }
  );
}

export function useGetUserArticles() {
  const { authToken } = useAuthToken();
  return useQuery(['articlesByUser', authToken], () =>
    getUserArticles(authToken)
  );
}
