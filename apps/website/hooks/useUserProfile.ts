import { createUserWithUserProfile } from '../services/users/users-api';
import { getUserProfile } from '../services/users/users-profiles-api';
import { UserProfile } from '@prisma/client';
import { useFetch } from './useFetch';

export function useGetUserProfile(authToken: string) {
  return useFetch<UserProfile, string | null>(getUserProfile, authToken);
}

export async function getOrCreateUserWithUserProfile(authToken: string | null) {
  let userProfile: UserProfile | null = null;
  userProfile = await getUserProfile(authToken);

  if (!userProfile) {
    const userWithUserProfile = await createUserWithUserProfile(authToken);
    userProfile = userWithUserProfile.profile;
  }

  return userProfile;
}
