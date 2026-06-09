import type { IUserData } from '../types/user';

interface UserCardProps {
  user: IUserData;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { name, age, email, file } = user;
  return (
    <div className="flex justify-center items-center gap-1 p-1  bg-gray-200 rounded shadow">
      <div className="w-16 h-16 flex justify-center items-center rounded shadow overflow-hidden">
        {file ? (
          <img src={file} alt={name} />
        ) : (
          <span className="text-xl">{name.slice(0, 1)}</span>
        )}
      </div>
      <div className="flex flex-col p-1 bg-white rounded shadow">
        <p className="text-sm">
          <span className="text-xs text-gray-700 italic mr-1">name:</span>
          {name}
        </p>
        <p className="text-sm">
          <span className="text-xs text-gray-700 italic mr-1">age:</span>
          {age}
        </p>
        <p className="text-sm">
          <span className="text-xs text-gray-700 italic mr-1">email:</span>
          {email}
        </p>
      </div>
    </div>
  );
};
