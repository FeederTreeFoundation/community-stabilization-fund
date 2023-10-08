import { Button, TextInput } from 'carbon-components-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { NextPage } from 'next';

import { useStorage } from '../../../src/hooks';
import UserService from '../../../src/services/user';

const AdminLoginPage: NextPage = (props) => {
  const [apiKey, setApiKey] = useState('');
  const [warn, setWarn] = useState(false);
  const [error, setError] = useState<Error>();

  const { setValue: setApiUserId } = useStorage('api_user_id', '');
  const { setValue: setOrganizationId } = useStorage('organization_id', '');

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
        const {api_user_id, organization_id } = res?.data ?? {};
        if (!api_user_id || Number.isNaN(api_user_id)) throw new Error('User not found');

        const returnPaths = ['/admin/login', '/form-responses', '/checklists', '/organizations'];
        const queryReturnUrl = router.query.returnUrl as string;
        const returnUrl = returnPaths.includes(queryReturnUrl) ? queryReturnUrl : null;
       
        setApiUserId(`${api_user_id}`);
        setOrganizationId(`${organization_id}`);
        router.push({
          pathname: `/admin/users/${api_user_id}`,
          query: { returnUrl },
        });
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
