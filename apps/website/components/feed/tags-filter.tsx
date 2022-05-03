import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { useGetTags } from '../../hooks/useTags';
import Spinner from '../common/spinner';
import { Fragment } from 'react';
import { Combobox } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiSelector } from 'react-icons/hi';

const TagsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const { data, isLoading } = useGetTags();
  const [query, setQuery] = useState('');

  function isSelected(value) {
    return selectedTags.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedTagsUpdated = [
        ...selectedTags,
        selectedTags.find((el) => el === value),
      ];
      setSelectedTags(selectedTagsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedTagsUpdated = selectedTags.filter((el) => el !== value);
    setSelectedTags(selectedTagsUpdated);
    setIsOpen(true);
  }

  if (isLoading) {
    return <Spinner />;
  }

  const filteredPeople =
    query === ''
      ? data
      : data.filter((tag) =>
          tag.tag
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="fixed top-16 w-72">
      <Combobox value={selectedTags} onChange={setSelectedTags}>
        <div className="relative mt-1">
          <div className="focus:outline-none relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={'Seleccione un tag'}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                data.map((tag) => (
                  <Combobox.Option
                    key={tag.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={tag.tag}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {tag.tag}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <AiOutlineCheck
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default TagsFilter;
