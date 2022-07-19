import Link from 'next/link';
import Image from 'next/image';
import AccountMenu from './account-menu';
import logo from '../../public/logo.png';
import { useUserProfileContext } from '../../contexts/user-context';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Button from '../common/button';
import useBreakpoints from '../../hooks/useBreakpoints';

const TopBar = () => {
  const { userProfile, isLoading } = useUserProfileContext();
  const { isXs } = useBreakpoints();

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
        {userProfile || isLoading ? (
          <div className="flex flex-row space-x-4 items-center relative">
            <div>
              {isLoading ? (
                <Skeleton
                  width="109px"
                  height="18px"
                  containerClassName="skeleton"
                />
              ) : !isXs ? (
                <Link
                  href={{
                    pathname: `articles/new`,
                  }}
                  passHref={true}
                >
                  <Button use="primary" size="sm">
                    Escribir Articulo
                  </Button>
                </Link>
              ) : null}
            </div>
            {isLoading ? (
              <Skeleton
                width="28px"
                height="28px"
                containerClassName="skeleton"
                borderRadius="50%"
              />
            ) : (
              <AccountMenu userProfile={userProfile} />
            )}
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
