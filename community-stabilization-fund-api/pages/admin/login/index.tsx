import type { NextPage } from 'next';

import { useState } from 'react';
import UserService from '../../../src/services/users';
import { Button, TextInput } from 'carbon-components-react';

const AdminLoginPage: NextPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [warn, setWarn] = useState(false);

  const handleChange = (e: any) => {
    const { value } = e.target;
    
    if(!value.includes(':')) {
      setWarn(true);
    } 
    if(value.length === 0 || value.includes(':')) {
      setWarn(false);
    } 

    setApiKey(value);
  };

  const submitApiKey = () => {
    console.log('1');
    if(warn || apiKey.length === 0) return;
    console.log('2');
        
    const [apiUser, token] = apiKey.split(':');
    UserService.login(apiUser, token).then(console.log);
  };

  return (
    <div>
      <h1>Enter Your Api Key: </h1>
      <TextInput
        warn={warn}
        id="api_key_input"
        warnText="Please include a colon (:)"
        invalidText="This shit is wrong"
        labelText="Api Key"
        placeholder="Insert your colon separated api key (i.e. foo:bar)"
        onChange={handleChange}
      />
      <Button onClick={submitApiKey}>Submit</Button>
    </div>
  );
};

export default AdminLoginPage;
