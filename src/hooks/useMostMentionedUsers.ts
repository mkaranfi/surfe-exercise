import { useEffect, useState } from 'react';

import { fetchMostMentionedUsers } from 'api/users-api-client';

import { User } from 'types/User';

export const useMostMentionedUsers = () => {
  const [mostMentionedUsers, setMostMentionedUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchMostMentionedUsers().then(setMostMentionedUsers);
  }, []);

  return mostMentionedUsers;
};
