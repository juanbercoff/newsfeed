import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import Link from 'next/link';

const AccountMenu = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <Image
          className="rounded-full cursor-pointer"
          alt="profile picture"
          height={30}
          width={30}
          src={
            'https://lh3.googleusercontent.com/a/AATXAJwS_dRkTCQqvW8PbWTJa4mbuIFgeJrVW2v9jGWC=s96-c'
          }
        />
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
                <button
                  className={`${
                    active ? ' text-gray-900' : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <Link href="/profile">Tu perfil</Link>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? ' text-gray-900' : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <Link href="/your-articles">Tus articulos</Link>
                </button>
              )}
            </Menu.Item>
          </div>
          <div>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? ' text-gray-900' : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <Link href="/faq">Ayuda</Link>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? ' text-gray-900' : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <Link href="/api/auth/logout?returnTo=/">Salir</Link>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AccountMenu;
