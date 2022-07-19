import { RadioGroup } from '@headlessui/react';
import { ArticlesResponseDto } from '@newsfeed/data';
import { ArticleHistory } from '@prisma/client';
import Utils from '../../../utils/Utils';
import { BUTTON_COLOR, ButtonUse } from '../button';

type Use = 'button' | 'radio';
type StyleKey = {
  checked: StyleValue;
  unChecked: StyleValue;
  base: string;
  textSize: string;
};
type StyleValue = {
  bgColor: string;
  textColor: string;
};
type Style = {
  [key in Use]: StyleKey;
};

type RadioGroupItemProps<TItem> = {
  item: TItem;
  itemLabel: string;
  description?: string;
  use: Use;
};

const STYLE: Style = {
  radio: {
    checked: {
      bgColor: 'bg-primary-700',
      textColor: 'text-white',
    },
    unChecked: {
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
    },
    base: 'relative shadow-md px-5 py-4 cursor-pointer flex focus:outline-none',
    textSize: 'text-sm',
  },
  button: {
    checked: {
      bgColor: 'transparent',
      textColor: 'text-black font-bold',
    },
    unChecked: {
      bgColor: 'transparent',
      textColor: 'text-gray-600 hover:text-primary-500',
    },
    base: 'relative px-5 py-4 cursor-pointer flex focus:outline-none hover:bg-white rounded-lg',
    textSize: 'text-base',
  },
};

const RadioGroupItem = <TItem,>({
  item,
  itemLabel,
  description,
  use,
}: RadioGroupItemProps<TItem>) => {
  return (
    <RadioGroup.Option
      value={item}
      className={({ checked }) =>
        `
  ${
    checked
      ? `${STYLE[use]['checked']['bgColor']} ${STYLE[use]['checked']['textColor']}`
      : STYLE[use]['unChecked']['textColor']
  } ${STYLE[use]['base']}`
      }
    >
      {({ checked }) => (
        <>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className={STYLE[use]['textSize']}>
                <RadioGroup.Label
                  as="p"
                  className={
                    checked
                      ? STYLE[use]['checked']['textColor']
                      : STYLE[use]['unChecked']['textColor']
                  }
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
