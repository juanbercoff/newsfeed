import { RadioGroup } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';

type RadioGroupProps<TItem, TValue> = {
  items: TItem[];
  renderItem: (item: TItem, index?: number) => ReactNode;
  value: TValue;
  setValue: (value: TValue) => void;
  label: string;
  extraOption?: ReactNode;
  keyExtractor: (item: TItem) => string;
  isHorizontal?: boolean;
};

const RadioGroupComponent = <TItem, TValue>({
  items,
  renderItem,
  value,
  setValue,
  label,
  extraOption,
  keyExtractor,
  isHorizontal,
}: RadioGroupProps<TItem, TValue>) => {
  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      className={`${isHorizontal ? 'flex space-x-2 space-x-reverse my-2' : ''}`}
    >
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      {items?.map((item, index) => {
        return <div key={keyExtractor(item)}>{renderItem(item, index)}</div>;
      })}
      {extraOption}
    </RadioGroup>
  );
};

export default RadioGroupComponent;
