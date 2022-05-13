import { useUpdateUserProfile } from '../../hooks/useUserProfile';
import { useState } from 'react';
import Button from '../common/button';

type ProfileCardProps = {
  title: string;
  value: string;
  userProfileId: string;
};

const ProfileCard = ({ title, value, userProfileId }: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate } = useUpdateUserProfile(userProfileId);

  return (
    <div className="flex space-x-2 justify-between">
      <div className="flex flex-col space-y-1 grow max-w-md">
        <p className="font-semibold text-lg">{title}</p>
        <input
          disabled={!isEditing}
          value={value}
          className="bg-transparent focus:outline-none border-b-2 py-1"
        />
      </div>
      <div className="flex space-x-2 items-center">
        <Button
          use="primary"
          size="sm"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {isEditing ? 'Guardar' : 'Editar'}
        </Button>
        {isEditing ? (
          <Button use="secondary" size="sm" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileCard;
