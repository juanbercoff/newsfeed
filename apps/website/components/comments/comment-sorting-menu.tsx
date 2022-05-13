import { Menu, Transition } from '@headlessui/react';
import { SortOptions } from './comments-list';
import { Fragment } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

type CommentSortingMenuProps = {
  selectedOption: SortOptions;
  setSelectedOption: (option: SortOptions) => void;
};

const CommentSortingMenu = ({
  selectedOption,
  setSelectedOption,
}: CommentSortingMenuProps) => {
  return (
    <Menu as="div" className="relative pb-1 z-10">
      <Menu.Button className="flex justify-between items-center space-x-1">
        <p className="font-semibold text-blue-500 cursor-pointer text-sm">
          {`Ordenar por: ${selectedOption}`}
        </p>
        <IoIosArrowDown className="text-blue-500" />
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
          className={`absolute left-0 w-56 mt-2 origin-top-right
          bg-white rounded-md
          shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-3`}
        >
          {Object.values(SortOptions).map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  className={`${
                    option === selectedOption
                      ? 'text-blue-600 font-semibold'
                      : active
                      ? ' text-gray-900'
                      : 'text-gray-500'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CommentSortingMenu;
