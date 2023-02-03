import axios from 'axios';

import { Button, TextInput } from 'carbon-components-react';

import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import UserService from '../../../src/services/users';

import type { User } from '../../../src/db';

import type { FormEvent } from 'react';

import styles from './users.module.css';

const AdminPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
  });
  useEffect(() => {
    const getUser = async () => {
      const user = await UserService.getById(id as string);
      // console.log(user?.data[0]);
      setUser(user?.data[0]);
    };
    getUser();
  }, [id]);
  const handleDelete = async () => {
    axios.delete(`/api/users/${user.id}`).then((res) => console.log(res));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting');
    axios.put(`/api/users/${user.id}`, {}).then((res) => console.log(res));
  };
  return (
    <div className={`${styles.container} ${styles.mt_6}`}>
      <div className={styles.header}>
        <h1>Hi, {`${user?.name}`}</h1>
        <div className='buttons'>
          <Button kind='primary' size='md' onClick={handleDelete}>
            Update User
          </Button>
          <Button kind='danger' size='md' onClick={handleDelete}>
            Delete User
          </Button>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          id='name'
          labelText='Username'
          placeholder='Placeholder text'
        />
        <Button kind='primary' size='md' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AdminPage;
