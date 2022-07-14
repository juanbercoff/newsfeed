import React, { useContext, useEffect } from 'react';
import useAuthToken from '../hooks/useAuthToken';
import { UserProfile } from '@prisma/client';
import { getUserProfile } from '../services/users/users-profiles-api';

export const UserProfileContext = React.createContext<
  UserProfileContextValue | undefined
>(undefined);

export type UserProfileContextValue = {
  userProfile: UserProfile;
  authToken: string | null;
  isLoading: boolean;
};

export type UserProfileContainerProps = {
  children: React.ReactNode;
};

export const UserProfileContainer = ({
  children,
}: UserProfileContainerProps) => {
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const { authToken } = useAuthToken(() => setIsLoading(false));

  useEffect(() => {
    if (authToken) {
      (async function () {
        setIsLoading(true);
        setUserProfile(await getUserProfile(authToken));
        setIsLoading(false);
      })();
    }
  }, [authToken]);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        authToken,
        isLoading,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileContext = () =>
  useContext(UserProfileContext) as UserProfileContextValue;
