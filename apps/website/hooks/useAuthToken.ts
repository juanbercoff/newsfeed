import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuthToken() {
  const { user } = useUser();
  const [authToken, setAuthToken] = useState<string | null>(null);
  useEffect(() => {
    if (!user) return;
    (async function () {
      if (!authToken) {
        try {
          const { data } = await axios.get('/api/auth/access-token');
          setAuthToken(data?.accessToken || '');
        } catch (error) {
          console.log('ERROR', error);
        }
      }
    })();
  }, [user, authToken]);

  return { authToken, user };
}
