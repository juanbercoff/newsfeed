//import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuthToken(callback?: () => void) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  useEffect(() => {
    (async function () {
      if (!authToken) {
        try {
          const { data } = await axios.get('/api/auth/access-token');
          setAuthToken(data?.accessToken || '');
        } catch (error) {
          console.log('ERROR', error);
          callback();
        }
      }
    })();
  }, [authToken, callback]);

  return { authToken };
}
