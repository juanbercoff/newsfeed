import {
  getUserProfile,
  updateUserProfile,
} from '../services/users/users-profiles-api';
import { Prisma } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';
import useAuthToken from './useAuthToken';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

export function useGetUserProfile(authToken: string) {
  return useQuery('userProfile', () => getUserProfile(authToken));
}

export function useUpdateUserProfile(
  userProfileId: string,
  onSuccess: (isEditing: boolean) => void
) {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      data,
      authToken,
    }: {
      data: Prisma.UserProfileUpdateInput;
      authToken: string;
    }) => updateUserProfile(userProfileId, authToken, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userProfile', userProfileId]);
        toast.success('Perfil modificado con exito');
        onSuccess(false);
      },
    }
  );
}
