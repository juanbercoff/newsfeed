import { RadioGroup } from '@headlessui/react';
import { ArticlesWithLikesResponseDto } from '@newsfeed/data';
import { ArticleHistory } from '@prisma/client';
import Utils from '../../utils/Utils';

type VersionControlItemProps = {
  versionNumber: number | string;
  createdDate: Date;
  articleVersionToDisplay: ArticleHistory | ArticlesWithLikesResponseDto;
};

const VersionControlItem = ({
  versionNumber,
  createdDate,
  articleVersionToDisplay,
}: VersionControlItemProps) => {
  return (
    <RadioGroup.Option
      value={articleVersionToDisplay}
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
                  {`Version ${versionNumber}`}
                </RadioGroup.Label>
                <RadioGroup.Description
                  as="span"
                  className={`inline ${
                    checked ? 'text-sky-100' : 'text-gray-500'
                  }`}
                >
                  {Utils.formatDateRelative(createdDate)}
                </RadioGroup.Description>
              </div>
            </div>
          </div>
        </>
      )}
    </RadioGroup.Option>
  );
};

export default VersionControlItem;
