import { WithPageAuthRequiredOptions } from '@auth0/nextjs-auth0';
import { toast } from 'react-toastify';
import Spinner from '../components/common/spinner';

export const getWithPageRequiredDefaultOptions = (
  others?: WithPageAuthRequiredOptions
) => {
  //TODO: more discrete onRedirecting
  return {
    onError: (error: any) => {
      toast.error(error as string);
      return <div>error</div>;
    },
    onRedirecting: () => (
      <div className="mt-4">
        <Spinner />
      </div>
    ),
    ...(others || {}),
  };
};
