import { useForm } from 'react-hook-form';
import { useUpdateUserProfile } from '../../hooks/useUserProfile';
import { useState } from 'react';
import Button from '../common/button';
import { Prisma } from '@prisma/client';

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
  } = useForm<Prisma.UserProfileUpdateInput>();
  const { mutate } = useUpdateUserProfile(userProfileId, setIsEditing);

  const onSubmit = (formData: Prisma.UserProfileUpdateInput) => {
    const data: Prisma.UserProfileUpdateInput = {
      ...formData,
    };
    mutate(data);
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
            {isEditing ? 'Guardar' : 'Editar'}
          </Button>
          {isEditing ? (
            <Button
              use="secondary"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default ProfileCard;
