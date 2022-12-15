import { useEffect, useState } from 'react';

import { fetchUsers } from 'api/users-api-client';

import { User } from 'types/User';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return users;
};
