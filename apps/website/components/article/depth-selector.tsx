import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type DepthSelectorProps = {
  setActiveIndex: (index: number) => void;
  activeIndex: number;
  setShowFirstLevel: () => void;
  setShowSecondLevel: () => void;
  hideUpperLevels: () => void;
};

const DepthSelector = ({
  setActiveIndex,
  setShowFirstLevel,
  setShowSecondLevel,
  hideUpperLevels,
  activeIndex,
}: DepthSelectorProps) => {
  return (
    <div>
      <Tab.Group
        selectedIndex={activeIndex}
        onChange={(index) => {
          setActiveIndex(index);
          switch (index) {
            case 0:
              hideUpperLevels();
              break;
            case 1:
              setShowFirstLevel();
              break;
            case 2:
              setShowSecondLevel();
          }
        }}
      >
        <Tab.List className="flex p-1 space-x-1 bg-white rounded-xl">
          <Tab
            value={0}
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium rounded-lg px-1',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-sky-900 text-white'
                  : 'text-blue-700 hover:bg-white/[0.12] hover:text-sky-900'
              )
            }
          >
            Easy
          </Tab>
          <Tab
            value={1}
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium rounded-lg px-1',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-sky-900 text-white'
                  : 'text-blue-700 hover:bg-white/[0.12] hover:text-sky-900'
              )
            }
          >
            Medium
          </Tab>
          <Tab
            value={2}
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium rounded-lg px-1',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-sky-900 text-white'
                  : 'text-blue-700 hover:bg-white/[0.12] hover:text-sky-900'
              )
            }
          >
            Hard
          </Tab>
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default DepthSelector;
