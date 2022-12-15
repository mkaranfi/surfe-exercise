import { useEffect, useState } from 'react';
import { filter, map } from 'lodash';

import 'components/mention/MentionedUsers.style.scss';

import { useUsers } from 'hooks/useUsers';

import { User } from 'types/User';

interface MentionedUsersProps {
  filterKeyword: string;
  onClickCallback: Function;
}

const MentionedUsers = (props: MentionedUsersProps) => {
  const { filterKeyword, onClickCallback } = props;

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const users = useUsers();

  useEffect(() => {
    const usersFilter = ({ username }: User) => username.toLowerCase().indexOf(filterKeyword) >= 0;
    const updatedUsers = filter(users, usersFilter).slice(0, 5);
    setFilteredUsers(updatedUsers);
  }, [filterKeyword, users]);

  const mappedUsers = map(filteredUsers, (user) => (
    <div
      key={`entry-${user.username}`}
      className="mentioned-user-entry"
      onClick={onClickCallback(user)}
    >{`@${user.username}`}</div>
  ));

  return <div className="mentioned-user-entries">{mappedUsers}</div>;
};

export default MentionedUsers;
