import { getEndpoint, callApiService } from '../api-service-utilities';
import { UserWithUserProfileResponseDto } from '@newsfeed/data';

export async function createUserWithUserProfile(
  authToken: string
): Promise<UserWithUserProfileResponseDto> {
  return callApiService<UserWithUserProfileResponseDto>(
    {
      url: getEndpoint('users'),
      method: 'POST',
    },
    authToken
  );
}
