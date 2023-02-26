import { Button, TextInput } from 'carbon-components-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import UserService from '../../../src/services/users';

import type { NextPage } from 'next';

const AdminLoginPage: NextPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [warn, setWarn] = useState(false);

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
    // TODO: Redirect to `admin/users/[id]` to display user info
    UserService.login(apiUser, token).then((res) => {
      router.push(`/admin/users/${res?.data.id}`);
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem('api_user');
    if (userId) {
      const returnUrl =
        (router.query.returnUrl as string) ?? `/admin/users/${userId}`;

      router.push(returnUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Enter Your Api Key: </h1>
      <TextInput
        warn={warn}
        id='api_key_input'
        warnText='Please include a colon (:)'
        invalidText='This shit is wrong'
        labelText='Api Key'
        placeholder='Insert your colon separated api key (i.e. foo:bar)'
        onChange={handleChange}
      />
      <Button onClick={submitApiKey}>Submit</Button>
    </div>
  );
};

export default AdminLoginPage;
