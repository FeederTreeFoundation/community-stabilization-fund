import { useUser } from '@auth0/nextjs-auth0';
import { Button, TextInput, Modal } from 'carbon-components-react';
import { useRouter } from 'next/router';
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
  
  const router = useRouter();
  const { user, error, isLoading} = useUser();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [apiUser, setApiUser] = useState<User>();
  
  const id = router.query.id;
  const apiUserId = localStorage.getItem('api_user');

  useEffect(() => {
    async function getApiUser (id?: string) {
      if (!id || typeof id !== 'string') return;
      const apiUser = await UserService.getById(id);
      
      if (apiUser?.data) setApiUser(apiUser?.data[0]);
    };
  
    function checkUserData() {
      if(apiUserId === id) getApiUser(apiUserId);
    }

    checkUserData();
  }, [apiUserId, id]);

  const handleRevokeAdmin = () => {
    UserService.logout();
  };

  const onSubmit = (data: FormData) => {
    const updatedApiUser = { ...apiUser, name: data.username } as User;
    UserService.update(`${apiUser?.id}`, updatedApiUser).then((res) => {
      
      setApiUser(updatedApiUser);
    });
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(!isEditing);

  if(isLoading) return;

  return (
    <div className={`${styles.container} ${styles.mt_6}`}>
      <div className={styles.header}>
        <h1>Hi, {`${user?.name}`}</h1>
      </div>
      { apiUser && (<div className={styles.buttons}>
        <Button kind='primary' size='md' onClick={handleEdit}>
          {isEditing ? 'Cancel' : 'Edit Api Key'}
        </Button>
        <Button kind='ghost' size='md' onClick={handleRevokeAdmin}>
          Logout Admin
        </Button>
      </div> )}
      <Modal
        open={isEditing}
        modalHeading='Edit api key'
        modalLabel='Admin functions'
        primaryButtonText='Update'
        secondaryButtonText='Cancel'
        onRequestSubmit={handleSubmit(onSubmit)}
        onRequestClose={() => setIsEditing(false)}
      >
        <TextInput
          id='name'
          labelText='Api User'
          defaultValue={apiUser?.name}
          placeholder='Enter the name of the api user'
          {...register('username', { required: true })}
          invalid={!!errors.username}
        />
      </Modal>
    </div>
  );
};

export default AdminPage;
