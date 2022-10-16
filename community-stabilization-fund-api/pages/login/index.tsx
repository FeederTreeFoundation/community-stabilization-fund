import React, { useContext } from 'react';

import type { GetServerSideProps, NextPage } from 'next';

import UserService from '../../src/services/users';
import { UserContext } from '../../src/modules/users';
import { Login } from '../../src/modules/users/components';


const LoginPage: NextPage = () => {
  const currentUser = useContext(UserContext);

  const handleLogin = async (apiKey: string) => {
    const [apiUser, token] = apiKey.split(':');

    try {
        await UserService.login(apiUser, token);
        currentUser.setApiKey(apiKey)
    } catch (error) {
        console.log({error})
    }
  };
  
  return (
    <Login handleLogin={handleLogin}/>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { apiKey, redirectPath } = context.query;
    // TODO: Set redirectPath on redirects to /login

    if(!apiKey) {
        return ({
            props: {},
        });
    };

    return ({
        redirect: {
          permanent: false,
          destination: `/${redirectPath ?? ''}`,
        },
        props: {},
    });
} 

export default LoginPage;