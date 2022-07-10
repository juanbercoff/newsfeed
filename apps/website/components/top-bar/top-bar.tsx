import Link from 'next/link';
import Image from 'next/image';
import AccountMenu from './account-menu';
import logo from '../../public/logo.png';
import { useUserProfileContext } from '../../contexts/user-context';

const TopBar = () => {
  const { userProfile, isLoading } = useUserProfileContext();

  return (
    <div className="flex fixed top-0 w-full justify-center border-b border-gray-300 bg-white z-10 px-4">
      <div className="py-5 flex flex-row justify-between max-w-4xl align-center w-full">
        <div className="cursor-pointer ">
          <Link href={'/feed'} passHref>
            <a className="flex items-center">
              <Image src={logo} height="30" width="120" alt="logo" />
            </a>
          </Link>
        </div>
        {userProfile && !isLoading ? (
          <div className="flex flex-row space-x-4 items-center relative">
            <div className="hover:text-cyan-800 transition-colors">
              <Link href={'/articles/new'}>Escribir articulo</Link>
            </div>
            <AccountMenu userProfile={userProfile} />
          </div>
        ) : (
          <div className="cursor-pointer self-center">
            <Link href="/api/auth/login?returnTo=/feed">Log in</Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default TopBar;
