import { useUser } from '@auth0/nextjs-auth0';
import { Button, TextInput, Modal } from 'carbon-components-react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { UserDTO } from '../../../src/db';

import UserService from '../../../src/services/user';

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
  const [apiUser, setApiUser] = useState<UserDTO>();
  const [apiError, setApiError] = useState<Error | undefined>(error);
  
  const id = router.query.id;
  const apiUserId = localStorage.getItem('api_user');

  useEffect(() => {
    async function getApiUser(id?: string) {
      if (!id || typeof id !== 'string') return;

      try {
        const results = await UserService.getById(id);
        
        if (results?.data) setApiUser(results.data);
      } catch (e) {
        setApiError(e as Error);
      }
    }
  
    function checkUserData() {
      if(`${apiUserId}` === `${id}`) {
        getApiUser(apiUserId ?? '');
      }
    }

    checkUserData();
  }, [apiUserId, id]);

  const handleRevokeAdmin = () => {
    UserService.logout();
  };

  const onSubmit = (data: FormData) => {
    const updatedApiUser = { ...apiUser, name: data.username } as UserDTO;
    UserService.update(`${apiUser?.id}`, updatedApiUser).then((_) => {
      
      setApiUser(updatedApiUser);
    });
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(!isEditing);

  if(isLoading) return <>Loading...</>;

  if(apiError || error) return (
    <div className={`${styles.mt_6}`}>Error: {apiError?.message ?? error?.message ?? 'Unknown error'}</div>
  );

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
