import axios from 'axios';
import { Button, TextInput } from 'carbon-components-react';
import { useState, useEffect, useRef } from 'react';

import type { User } from '../../../db';
import type { ChangeEvent, FormEvent } from 'react';

import styles from '../styles/users.module.css';

interface AdminProfileProps {
  user: User;
  handleDelete: () => void;
  handleLogout: () => void;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
}

const AdminProfile = ({ user, handleDelete, handleLogout, handleSubmit, handleChange}: AdminProfileProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
    // TODO: Open a modal to edit User when isEditing is true
  const handleEdit = () => setIsEditing(!isEditing);
  return    ( <div className={`${styles.container} ${styles.mt_6}`}>
  <div className={styles.header}>
    <h1>Hi, {`${user?.name}`}</h1>
  </div>
  <div className={styles.buttons}>
    <Button kind='primary' size='md' onClick={handleEdit}>
      {isEditing ? 'Cancel' : 'Edit'}
    </Button>
    <Button kind='danger' size='md' onClick={handleDelete}>
      Delete User
    </Button>
    <Button kind='ghost' size='md' onClick={handleLogout}>
      Logout Admin
    </Button>
  </div>
  <form className={styles.form} onSubmit={handleSubmit}>
    {isEditing && (
      <>
        <TextInput
          id='name'
          labelText='Username'
          placeholder='Placeholder text'
          onChange={handleChange}
        />
        <Button kind='primary' size='md' type='submit'>
          Update
        </Button>
      </>
    )}
  </form>
</div>)
}

export { AdminProfile };