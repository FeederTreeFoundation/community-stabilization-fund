import axios from 'axios';
import { Form, Button, TextInput } from 'carbon-components-react';
import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import UserService from '../../../src/services/user';

import type { User } from '../../../src/db';

import styles from './users.module.css';

type FormData = {
  username: string;
};

const AdminPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const id = localStorage.getItem('api_user');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await UserService.getById(id as string);
      if (!id || typeof id !== 'string') return;
      if (user?.data) setUser(user?.data[0]);
    };
    getUser();
  }, [id]);

  const handleDelete = async () => {
    await UserService.logout();
    axios.delete(`/api/users/${user.id}`).then((res) => console.log(res));
  };

  const handleRevokeAdmin = () => {
    UserService.logout();
  };

  const onSubmit = (data: FormData) => {
    const updatedUser = { ...user, name: data.username };
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
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {isEditing && (
          <>
            <TextInput
              id='name'
              labelText='Username'
              placeholder='Placeholder text'
              {...register('username', { required: true })}
              invalid={!!errors.username}
            />

            <Button kind='primary' size='md' type='submit'>
              Update
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default AdminPage;
