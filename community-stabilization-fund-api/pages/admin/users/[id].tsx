import { useUser } from '@auth0/nextjs-auth0';
import { Button, TextInput, Modal } from 'carbon-components-react';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import type { UserDTO } from '../../../src/db';

import { useStorage } from '../../../src/hooks';
import { ApiUserContext } from '../../../src/modules/users/contexts';
import UserService from '../../../src/services/user';

import { isEmpty } from '../../../src/utils';

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
  const { state } = useStorage('api_user', '');

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [apiError, setApiError] = useState<Error | undefined>(error);

  const { apiUser, updateApiUser } = useContext(ApiUserContext);
  
  const {id, returnUrl } = router.query;
  const apiUserId = `${state}`;

  useEffect(() => {
    setTimeout(() => {
      if(!isEmpty(returnUrl) && !isEmpty(apiUser) && !isEmpty(apiUserId)) {
        router.push(`${returnUrl}`);
      }
    }, 500);
  }, [returnUrl, apiUser, apiUserId, router]);

  useEffect(() => {
    async function getApiUser(id?: string) {
      if (isEmpty(id) || typeof id !== 'string') return;

      try {
        const results = await UserService.getById(id);
        
        if (results?.data && updateApiUser) updateApiUser(results.data);        
      } catch (e) {
        setApiError(e as Error);
      }
    }
  
    function checkUserData() {
      if (isEmpty(apiUserId) || typeof apiUserId !== 'string') return;
      
      if(`${apiUserId}` === `${id}`) {
        getApiUser(apiUserId);
      }
    }

    checkUserData();
  }, [apiUserId, id, updateApiUser]);

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

  function onSubmit(data: FormData) {
    if(typeof updateApiUser !== 'function') return;

    const updatedApiUser = { ...apiUser, name: data.username } as UserDTO;
    UserService.update(`${apiUser?.id}`, updatedApiUser).then((_) => {
      
      updateApiUser(updatedApiUser);
    });
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  function handleRevokeAdmin() {
    UserService.logout();
  }
};

export default AdminPage;
