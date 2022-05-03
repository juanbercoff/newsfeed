import { callApiService, getEndpoint } from './api-service-utilities';

import { Tag } from '@prisma/client';

export async function getTags(): Promise<Tag[]> {
  return callApiService<Tag[]>({
    url: getEndpoint('tags'),
    method: 'GET',
  });
}
