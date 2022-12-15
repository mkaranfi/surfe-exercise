import { DragEvent } from 'react';
import { map } from 'lodash';

import 'components/mention/MostMentionedUsers.style.scss';

import { User } from 'types/User';

import { useMostMentionedUsers } from 'hooks/useMostMentionedUsers';

const MostMentionedUsers = () => {
  const users = useMostMentionedUsers();

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
