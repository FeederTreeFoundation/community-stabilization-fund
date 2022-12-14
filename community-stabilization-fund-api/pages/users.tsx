import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { User } from '../src/modules';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface GetUserResponse {
  data: User[];
}

const UserPage: NextPage = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    axios
      .get<GetUserResponse>('http://localhost:3000/api/users')
      .then(({ data }) => setUsers(data));
  }, []);
  const user = users ? users[0] : {};
  return <h1>Hi,{`${user?.name || ''}`}.</h1>;
};

export default UserPage;
