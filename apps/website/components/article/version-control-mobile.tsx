import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiSelector } from 'react-icons/hi';
import { VersionControlItemProps } from './version-control';

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

const VersionControlMobile = ({
  article,
  articleHistory,
  articleVersionToDisplay,
  setArticleVersionToDisplay,
}: VersionControlItemProps) => {
  const [index, setIndex] = useState(null);

  console.log('index', index);

  return (
    <div>
      <Listbox
        value={articleVersionToDisplay}
        onChange={setArticleVersionToDisplay}
      >
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {index ? `Version ${index + 1}` : 'Version actual'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {articleHistory?.length > 0
                ? articleHistory.map((articleHistory, index) => (
                    <div
                      className="cursor-pointer"
                      key={articleHistory.id}
                      onClick={() => setIndex(index)}
                    >
                      <Listbox.Option
                        className={({ active }) =>
                          `cursor-default select-none relative py-2 px-4 ${
                            active
                              ? 'text-amber-900 bg-amber-100'
                              : 'text-gray-900'
                          }`
                        }
                        value={articleHistory}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {`Version ${index + 1}`}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    </div>
                  ))
                : null}
              <div className="cursor-pointer" onClick={() => setIndex(null)}>
                <Listbox.Option
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 px-4 ${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                    }`
                  }
                  value={article}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {`Version Actual`}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              </div>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default VersionControlMobile;