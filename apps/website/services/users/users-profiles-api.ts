import { getEndpoint, callApiService } from '../api-service-utilities';
import { UserProfile } from '@prisma/client';

export async function getUserProfile(authToken: string): Promise<UserProfile> {
  return callApiService<UserProfile>(
    {
      url: getEndpoint('user-profiles'),
      method: 'GET',
    },
    authToken
  );
}
