import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0';
import { toast } from 'react-toastify';

export default function useAuthToken(callback?: () => void) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      return callback();
    }
    (async function () {
      if (!authToken) {
        try {
          const { data } = await axios.get('/api/auth/access-token');
          setAuthToken(data?.accessToken || '');
        } catch (error) {
          callback();
          toast.error('Error al intentar autorizarte, intenta nuevamente!');
        }
      }
    })();
  }, [authToken, callback]);

  return { authToken };
}
