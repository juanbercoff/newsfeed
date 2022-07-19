import { RadioGroup } from '@headlessui/react';
import { ArticlesResponseDto } from '@newsfeed/data';
import { ArticleHistory } from '@prisma/client';
import Utils from '../../../utils/Utils';

type RadioGroupItemProps<TItem> = {
  item: TItem;
  itemLabel: string;
  description?: string;
};

const RadioGroupItem = <TItem,>({
  item,
  itemLabel,
  description,
}: RadioGroupItemProps<TItem>) => {
  return (
    <RadioGroup.Option
      value={item}
      className={({ checked }) =>
        `
  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}
    relative shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
      }
    >
      {({ checked }) => (
        <>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="text-sm">
                <RadioGroup.Label
                  as="p"
                  className={`font-medium  ${
                    checked ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {itemLabel}
                </RadioGroup.Label>
                {description ?? (
                  <RadioGroup.Description
                    as="span"
                    className={`inline ${
                      checked ? 'text-sky-100' : 'text-gray-500'
                    }`}
                  >
                    {description}
                  </RadioGroup.Description>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </RadioGroup.Option>
  );
};

export default RadioGroupItem;
