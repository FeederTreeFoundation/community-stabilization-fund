import type { NextPage } from 'next';

import { useEffect, useState } from 'react';
import UserService from '../../../src/services/users';
import type { User } from '../../../src/db';

const UserPage: NextPage = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    // WIP: Grab the user_id from the authenticate path and 
    UserService.getAll()
      .then(({data}) => setUsers(data));
  }, []);

  const user = users ? users[0] : null;
  return <h1>Hi, {`${user?.name || ''}`}.</h1>;
};

export default UserPage;
