import { createUserWithUserProfile } from '../services/users/users-api';
import { getUserProfile } from '../services/users/users-profiles-api';
import { getUser } from '../services/users/users-api';
import { UserProfile } from '@prisma/client';
import { useFetch } from './useFetch';

export function useGetUserProfile(authToken: string) {
  return useFetch<UserProfile, string | null>(getUserProfile, authToken);
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
