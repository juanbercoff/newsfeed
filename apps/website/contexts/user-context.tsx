import React, { useContext, useEffect } from 'react';
import useAuthToken from '../hooks/useAuthToken';
import { useUser } from '@auth0/nextjs-auth0';
import { UserProfile } from '@prisma/client';
import { getOrCreateUserWithUserProfile } from '../services/users/users-profiles-api';

export const UserProfileContext = React.createContext<
  UserProfileContextValue | undefined
>(undefined);

export type UserProfileContextValue = {
  userProfile: UserProfile;
  authToken: string | null;
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

  useEffect(() => {
    console.log('user', user);
    console.log('authToken', authToken);
    if (user && authToken) {
      (async function () {
        setUserProfile(await getOrCreateUserWithUserProfile(authToken));
      })();
    }
  }, [user, authToken]);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        authToken,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfileContext = () =>
  useContext(UserProfileContext) as UserProfileContextValue;
