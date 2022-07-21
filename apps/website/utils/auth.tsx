import { WithPageAuthRequiredOptions } from '@auth0/nextjs-auth0';
import { toast } from 'react-toastify';

export const getWithPageRequiredDefaultOptions = (
  others?: WithPageAuthRequiredOptions
) => {
  //TODO: more discrete onRedirecting
  return {
    onError: (error: any) => toast.error(error as string),
    onRedirecting: () => {
      return (
        <div className="flex flex-col items-center mt-11">
          <h1 className="font-bold text-2xl">
            Redireccionando a la pagina de login
          </h1>
        </div>
      );
    },
    ...(others || {}),
  };
};
