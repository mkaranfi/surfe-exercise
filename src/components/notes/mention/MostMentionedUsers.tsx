import { DragEvent } from 'react';
import { map } from 'lodash';

import 'components/notes/mention/MostMentionedUsers.style.scss';

import { User } from 'types/User';

interface MostMentionedUsersProps {
  users: User[];
}

const MostMentionedUsers = (props: MostMentionedUsersProps) => {
  const { users } = props;

  const handleDragStart =
    (username: string) =>
    ({ dataTransfer }: DragEvent) =>
      dataTransfer?.setData('mention', `@${username}`);

  const usersMapper = ({ username }: User) => {
    return (
      <span
        draggable
        key={`most-mentioned-${username}`}
        className="most-mentioned-user"
        onDragStart={handleDragStart(username)}
      >
        @{username}
      </span>
    );
  };

  const mappedUsers = map(users, usersMapper);

  return (
    <div className="most-mentioned-wrapper">
      <span className="most-mentioned-title">most mentioned users</span>
      {mappedUsers}
    </div>
  );
};

export default MostMentionedUsers;
