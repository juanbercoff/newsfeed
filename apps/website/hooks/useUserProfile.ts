import {
  getUserProfile,
  updateUserProfile,
} from '../services/users/users-profiles-api';
import { Prisma, UserProfile } from '@prisma/client';
import { useFetch } from './useFetch';
import { useMutation, useQueryClient } from 'react-query';
import useAuthToken from './useAuthToken';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

export function useGetUserProfile() {
  const { authToken } = useAuthToken();
  return useQuery('userProfile', () => getUserProfile(authToken));
}

export function useUpdateUserProfile(
  userProfileId: string,
  onSuccess: (isEditing: boolean) => void
) {
  const { authToken } = useAuthToken();
  const queryClient = useQueryClient();
  return useMutation(
    (data: Prisma.UserProfileUpdateInput) =>
      updateUserProfile(userProfileId, authToken, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userProfile', userProfileId]);
        toast.success('Perfil modificado con exito');
        onSuccess(false);
      },
    }
  );
}
