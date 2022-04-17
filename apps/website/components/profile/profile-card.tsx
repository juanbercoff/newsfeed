import { useState } from 'react';
import Button from '../common/button';

type ProfileCardProps = {
  title: string;
  value: string;
};

const ProfileCard = ({ title, value }: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

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
          text={isEditing ? 'Guardar' : 'Editar'}
          onClick={() => {
            setIsEditing(true);
          }}
        />
        {isEditing ? (
          <Button
            use="secondary"
            size="sm"
            text="Cancelar"
            onClick={() => setIsEditing(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProfileCard;
