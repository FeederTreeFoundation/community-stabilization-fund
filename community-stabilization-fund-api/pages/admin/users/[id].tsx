import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

import UserService from '../../../src/services/user';

import type { User } from '../../../src/db';
import type { ChangeEvent, FormEvent } from 'react';

import { AdminProfile } from '../../../src/modules/users';

const AdminPage = () => {
  const id = localStorage.getItem('api_user');
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
  });
  const inputRef = useRef('');
  useEffect(() => {
    const getUser = async () => {
      const user = await UserService.getById(id as string);
      setUser(user?.data[0]);
    };

    getUser();
  }, [id]);

  const handleDelete = async () => {
    await UserService.logout();
    await UserService.delete(`${user.id}`);
  };

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    inputRef.current = value;
  };

  const handleRevokeAdmin = () => {
    UserService.logout();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, name: inputRef.current };
    UserService.update(`${user.id}`, updatedUser).then((res) => {
      setUser(updatedUser);
    });
  };

  return (
    <AdminProfile 
      user={user} 
      handleDelete={handleDelete} 
      handleLogout={handleRevokeAdmin} 
      handleSubmit={handleSubmit} 
      handleChange={handleChange} 
    />
  );
};

export default AdminPage;
