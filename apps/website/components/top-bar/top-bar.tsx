import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import AccountMenu from './account-menu';

const TopBar = () => {
  const { user } = useUser();
  console.log('userrer', user);

  return (
    <div className="flex fixed top-0 w-full justify-center border-b border-gray-300 bg-white z-10 px-4">
      <div className="py-5 flex flex-row justify-between max-w-4xl align-center w-full">
        <div className="cursor-pointer">
          <Link href={'/feed'}>Logo</Link>
        </div>
        {user ? (
          <div className="flex flex-row space-x-4 items-center relative">
            <Link href={'/articles/new'}>Escribir articulo</Link>
            <AccountMenu />
          </div>
        ) : (
          <div className="cursor-pointer">
            <Link href="/api/auth/login?returnTo=/feed">Log in</Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default TopBar;
