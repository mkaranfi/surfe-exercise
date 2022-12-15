import { map } from 'lodash';

import 'components/notes/mention/MentionedUsers.style.scss';

import { User } from 'types/User';

interface MentionedUsersProps {
  users: User[];
  onClickCallback: Function;
}

const MentionedUsers = (props: MentionedUsersProps) => {
  const { users, onClickCallback } = props;

  const mappedUsers = map(users, (user) => (
    <div
      key={`entry-${user.username}`}
      className="mentioned-user-entry"
      onClick={onClickCallback(user)}
    >{`@${user.username}`}</div>
  ));
  return <div className="mentioned-user-entries">{mappedUsers}</div>;
};

export default MentionedUsers;
