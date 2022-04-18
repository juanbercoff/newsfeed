import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import AccountMenu from './account-menu';
import useAuthToken from '../..//hooks/useAuthToken';

const TopBar = () => {
  const { user } = useUser();
  const { authToken } = useAuthToken();

  console.log(user);
  console.log(authToken);
  return (
    <div className="flex fixed top-0 w-full justify-center border-b border-gray-300 bg-white z-10 px-4">
      <div className="py-5 flex flex-row justify-between max-w-4xl align-center w-full">
        <div>LOGO</div>
        <div className="flex flex-row space-x-4 items-center relative">
          <Link href={'/articles/new'}>Escribir articulo</Link>
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};
export default TopBar;
