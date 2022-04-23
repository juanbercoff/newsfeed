import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type DepthSelectorProps = {
  setActiveIndex: (index: number) => void;
  activeIndex: number;
  setShowFirstLevel: (shouldOpen: boolean) => void;
  setShowSecondLevel: (shouldOpen: boolean) => void;
  handleLevels: (shouldOpen: boolean) => void;
};

const DepthSelector = ({
  setActiveIndex,
  setShowFirstLevel,
  setShowSecondLevel,
  handleLevels,
  activeIndex,
}: DepthSelectorProps) => {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group
        selectedIndex={activeIndex}
        onChange={(index) => {
          setActiveIndex(index);
          switch (index) {
            case 0:
              handleLevels(false);
              break;
            case 1:
              setShowFirstLevel(true);
              setShowSecondLevel(false);
              break;
            case 2:
              handleLevels(true);
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
  {
    /*       <LevelNumberIcon
        onClick={() => {
          setActiveIndex(0);
          handleLevels(false);
        }}
        Icon={RiNumber0}
        isActive={activeIndex === 0}
      />
      <LevelNumberIcon
        onClick={() => {
          setActiveIndex(1);
          setShowFirstLevel(true);
          setShowSecondLevel(false);
        }}
        Icon={RiNumber1}
        isActive={activeIndex === 1}
      />
      <LevelNumberIcon
        onClick={() => {
          setActiveIndex(2);
          handleLevels(true);
        }}
        Icon={RiNumber2}
        isActive={activeIndex === 2}
      />
     */
  }
};

export default DepthSelector;
