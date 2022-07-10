import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import UserAvatar from '../common/user-avatar';
import { UserProfile } from '@prisma/client';

type AccountMenuProps = {
  userProfile: UserProfile;
};

const AccountMenu = ({ userProfile }: AccountMenuProps) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex">
        <UserAvatar avatarSize="md" userName={userProfile?.userName} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 w-56 mt-2 origin-top-right
          bg-white divide-y divide-gray-100 rounded-md
          shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-3`}
        >
          <div>
            <Menu.Item>
              {({ active }) => (
                <LinkWrapper
                  href="/profile"
                  className={`${
                    active ? ' text-gray-900' : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Tu perfil
                </LinkWrapper>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <LinkWrapper
                  href="/your-articles"
                  className={`${
                    active ? ' text-gray-900' : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Tus articulos
                </LinkWrapper>
              )}
            </Menu.Item>
          </div>
          <div>
            <Menu.Item>
              {({ active }) => (
                <LinkWrapper
                  href="/faq"
                  className={`${
                    active ? ' text-gray-900' : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Ayuda
                </LinkWrapper>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <LinkWrapper
                  href="/api/auth/logout?returnTo=/"
                  className={`${
                    active ? ' text-gray-900' : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Salir
                </LinkWrapper>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

//TODO add types
const LinkWrapper = ({ href, children, ...rest }) => {
  return (
    <Link href={href} passHref>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default AccountMenu;
