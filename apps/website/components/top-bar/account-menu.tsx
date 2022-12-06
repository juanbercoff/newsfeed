import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import UserAvatar from '../common/user-avatar';
import { UserProfile } from '@newsfeed/data';
import { useTranslation } from 'next-i18next';

type AccountMenuProps = {
  userProfile: UserProfile;
};

const MENU_ITEMS = [
  {
    href: '/profile',
    label: 'top-bar:yourProfile',
  },
  {
    href: '/your-articles',
    label: 'top-bar:yourArticles',
  },
  { href: '/faq', label: 'top-bar:faq' },
  {
    href: '/api/auth/logout?returnTo=/',
    label: 'common:signOut',
  },
];

const AccountMenu = ({ userProfile }: AccountMenuProps) => {
  const { t } = useTranslation(['top-bar', 'common']);

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
            {MENU_ITEMS.map((item) => (
              <div key={item.label}>
                <Menu.Item>
                  {({ active }) => (
                    <LinkWrapper
                      href={item.href}
                      className={`${
                        active ? ' text-gray-900' : 'text-gray-500'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {t(item.label)}
                    </LinkWrapper>
                  )}
                </Menu.Item>
              </div>
            ))}
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
