import { User } from 'lucide-react';
import type { TeamMember } from '../../types/team';

interface AccountGroupProps {
  members: TeamMember[];
  limit?: number;
}

const AVATAR_COLORS = [
  { border: 'border-red-400', text: 'text-red-400' },
  { border: 'border-yellow-400', text: 'text-yellow-400' },
  { border: 'border-green-400', text: 'text-green-400' },
  { border: 'border-purple-400', text: 'text-purple-400' },
  { border: 'border-pink-400', text: 'text-pink-400' },
];

const AccountGroup = ({ members, limit = 5 }: AccountGroupProps) => {
  const visibleMembers = members.slice(0, limit);
  const hiddenMembersCount = members.length - visibleMembers.length;

  return (
    <div className="flex -space-x-3">
      {visibleMembers.map((member, index) => {
        const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
        return (
          <div
            key={member.id}
            className={`w-8 h-8 rounded-full bg-white border-2 ${color.border} ring-2 ring-white flex items-center justify-center`}
          >
            <User className={`${color.text}`} size={16} />
          </div>
        );
      })}
      {hiddenMembersCount > 0 && (
        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-400 ring-2 ring-white flex items-center justify-center">
          <span className="text-xs font-bold text-gray-600">
            +{hiddenMembersCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default AccountGroup;
