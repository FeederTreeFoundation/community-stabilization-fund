import { Button, TextInput } from 'carbon-components-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { NextPage } from 'next';

import UserService from '../../../src/services/user';

const AdminLoginPage: NextPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [warn, setWarn] = useState(false);
  const [error, setError] = useState<Error>();

  const router = useRouter();

  const handleChange = (e: any) => {
    const { value } = e.target;

    if (!value.includes(':')) {
      setWarn(true);
    }
    if (value.length === 0 || value.includes(':')) {
      setWarn(false);
    }

    setApiKey(value);
  };

  const submitApiKey = () => {
    if (warn || apiKey.length === 0) return;
    const [apiUser, token] = apiKey.split(':');

    UserService.login(apiUser, token)
      .then((res) => {
        const userId = res?.data.id;
        if (!userId || Number.isNaN(userId)) throw new Error('User not found');

        const returnPaths = ['/admin/login', '/form-responses', '/checklists'];
        const queryReturnUrl = router.query.returnUrl as string;
        const returnUrl = returnPaths.includes(queryReturnUrl) ? queryReturnUrl : `/admin/users/${userId}`;
        localStorage.setItem('api_user', `${userId}`);
        router.push(returnUrl);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className='mt-8'>
      <TextInput
        warn={warn}
        id='api_key_input'
        warnText='Please include a colon (:)'
        invalidText={error?.message}
        invalid={!!error}
        labelText='Enter Your Api Key:'
        placeholder='Insert your colon separated api key (i.e. foo:bar)'
        onChange={handleChange}
      />
      <Button onClick={submitApiKey}>Submit</Button>
    </div>
  );
};

export default AdminLoginPage;
