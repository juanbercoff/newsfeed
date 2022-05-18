import { getEndpoint, callApiService } from '../api-service-utilities';
import { Prisma, UserProfile } from '@prisma/client';
import { createUserWithUserProfile, getUser } from './users-api';

export async function getUserProfile(authToken: string): Promise<UserProfile> {
  return callApiService<UserProfile>(
    {
      url: getEndpoint('user-profiles'),
      method: 'GET',
    },
    authToken
  );
}

export async function getOrCreateUserWithUserProfile(authToken: string | null) {
  const user = await getUser(authToken);

  if (!user) {
    const userWithUserProfile = await createUserWithUserProfile(authToken);
    return userWithUserProfile.profile;
  } else {
    return await getUserProfile(authToken);
  }
}

export async function updateUserProfile(
  userProfileId: string,
  authToken: string,
  data: Prisma.UserProfileUpdateInput
): Promise<UserProfile> {
  return callApiService<UserProfile>(
    {
      url: getEndpoint(`user-profiles/${userProfileId}`),
      method: 'PATCH',
      data,
    },
    authToken
  );
}
