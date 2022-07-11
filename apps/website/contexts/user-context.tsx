import React, { useContext, useEffect } from 'react';
import useAuthToken from '../hooks/useAuthToken';
import { UserProfile } from '@prisma/client';
import { getOrCreateUserWithUserProfile } from '../services/users/users-profiles-api';

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
  const { authToken, user } = useAuthToken();
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    if (user && authToken) {
      (async function () {
        setUserProfile(await getOrCreateUserWithUserProfile(authToken));
        setIsLoading(false);
      })();
    }
  }, [user, authToken]);

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
