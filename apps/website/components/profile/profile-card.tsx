import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useUpdateUserProfile } from '../../hooks/useUserProfile';
import Button from '../common/button';
import { useUserProfileContext } from '../../contexts/user-context';
import { UserProfileUpdateInput } from '@newsfeed/data';
import { useTranslation } from 'next-i18next';
import 'react-toastify/dist/ReactToastify.css';

type ProfileCardProps = {
  title: string;
  value: string;
  userProfileId: string;
  field: string;
};

const ProfileCard = ({
  title,
  value,
  userProfileId,
  field,
}: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // FIX useForm<Prisma.UserProfileUpdateInput> hangs Checking validity of types . indefinitely
  const { authToken } = useUserProfileContext();
  const { mutate } = useUpdateUserProfile(userProfileId, setIsEditing);
  const { t } = useTranslation('common');

  const onSubmit = (formData: UserProfileUpdateInput) => {
    const data: UserProfileUpdateInput = {
      ...formData,
    };
    mutate({ data, authToken });
  };

  return (
    <form>
      <div className="flex space-x-2 justify-between">
        <div className="flex flex-col space-y-1 grow max-w-md">
          <p className="font-semibold text-lg">{title}</p>
          <input
            {...register(field, {
              required: true,
              maxLength: 80,
              value,
            })}
            disabled={!isEditing}
            className="bg-transparent focus:outline-none border-b-2 py-1"
          />
        </div>
        <div className="flex space-x-2 items-center">
          <Button
            use="primary"
            size="sm"
            onClick={() => {
              if (isEditing) {
                handleSubmit(onSubmit)();
              }
              setIsEditing(true);
            }}
          >
            {isEditing ? t('save') : t('edit')}
          </Button>
          {isEditing ? (
            <Button
              use="secondary"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              {t('cancel')}
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default ProfileCard;
