import { WithPageAuthRequiredOptions } from '@auth0/nextjs-auth0';

export const getWithPageRequiredDefaultOptions = (
  others?: WithPageAuthRequiredOptions
) => {
  return {
    onError: (error: any) => <div>{error}</div>,
    onRedirecting: () => <div>Redireccionando a la pagina de login...</div>,
    ...(others || {}),
  };
};
