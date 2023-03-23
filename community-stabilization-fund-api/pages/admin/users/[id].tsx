import axios from 'axios';
import { Button, TextInput } from 'carbon-components-react';

import { useRouter } from 'next/router';

import { useState, useEffect, useRef } from 'react';

import UserService from '../../../src/services/user';

import type { User } from '../../../src/db';
import type { ChangeEvent, FormEvent } from 'react';

import styles from './users.module.css';

const AdminPage = () => {
  const id = localStorage.getItem('api_user');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
  });
  const router = useRouter();
  const inputRef = useRef('');
  useEffect(() => {
    if (!!id) {
      router.push('/admin/login');
    } else {
      const getUser = async () => {
        const user = await UserService.getById(id as string);
        setUser(user?.data[0]);
      };
      getUser();
    }
  }, [id, router]);

  const handleDelete = async () => {
    await UserService.logout();
    axios.delete(`/api/users/${user.id}`).then((res) => console.log(res));
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

  // TODO: Open a modal to edit User when isEditing is true
  const handleEdit = () => setIsEditing(!isEditing);

  return (
    <div className={`${styles.container} ${styles.mt_6}`}>
      <div className={styles.header}>
        <h1>Hi, {`${user?.name}`}</h1>
      </div>
      <div className={styles.buttons}>
        <Button kind='primary' size='md' onClick={handleEdit}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
        <Button kind='danger' size='md' onClick={handleDelete}>
          Delete User
        </Button>
        <Button kind='ghost' size='md' onClick={handleRevokeAdmin}>
          Logout Admin
        </Button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {isEditing && (
          <>
            <TextInput
              id='name'
              labelText='Username'
              placeholder='Placeholder text'
              onChange={handleChange}
            />
            <Button kind='primary' size='md' type='submit'>
              Update
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminPage;
