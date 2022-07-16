import { Listbox } from '@headlessui/react';

type ListBoxItemProps<TItem> = {
  handleClick: () => void;
  item: TItem;
  itemLabel: string;
};

const ListBoxItem = <TItem,>({
  handleClick,
  item,
  itemLabel,
}: ListBoxItemProps<TItem>) => {
  return (
    <div className="cursor-pointer" onClick={() => handleClick()}>
      <Listbox.Option
        className={({ active }) =>
          `select-none relative py-2 px-4 ${
            active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
          }`
        }
        value={item}
      >
        {({ selected }) => (
          <>
            <span
              className={`block truncate ${
                selected ? 'font-medium' : 'font-normal'
              }`}
            >
              {itemLabel}
            </span>
          </>
        )}
      </Listbox.Option>
    </div>
  );
};

export default ListBoxItem;
