import { useUser } from '@auth0/nextjs-auth0';
import { UserAdmin, Logout, Login, User, Settings } from '@carbon/icons-react';
import {
  HeaderGlobalAction,
  HeaderGlobalBar,
  Link,
  Modal,
  Button,
} from 'carbon-components-react';
import { useState } from 'react';

import FormResponseService from '../services/form-response';

const UserNavigation = () => {
  const { user, error, isLoading } = useUser();

  const userId = localStorage.getItem('api_user');
  const userPath = userId ? `/admin/users/${userId}` : '/admin/login';
  const [settingsState, setSettingsState] = useState<boolean>(false);
  const deleteAllFormResponsesText = "Delete's all form responses";
  const deleteAllBtnText = 'Reset';
  const deleteAllFormResponses = async () => {
    const resp = await FormResponseService.deleteAllFormResponses();
    if (resp.status === 201) {
      setSettingsState(false);
    }
  };

  if (isLoading) return <></>;

  if (error || !user) {
    return (
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label='Login' onClick={() => {}}>
          <Link href='/api/auth/login'>Login</Link>
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    );
  }

  // TODO: Correct logic for displaying admin users
  return (
    <>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label='Settings'
          onClick={() => {
            setSettingsState(!settingsState);
          }}
        >
          <Settings />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label='My Profile' onClick={() => {}}>
          <Link href={userPath}>{user.org_id ? <UserAdmin /> : <User />}</Link>
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label='Log Out' onClick={() => {}}>
          <Link href='/api/auth/logout'>
            <Logout />
          </Link>
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <Modal
        open={settingsState}
        modalHeading='Reset form responses'
        modalLabel='Admin functions'
        passiveModal={true}
        size={'xs'}
        onRequestClose={() => setSettingsState(false)}
      >
        <p className='mb-2'>{deleteAllFormResponsesText}</p>
        <Button kind={'danger'} onClick={deleteAllFormResponses}>
          {deleteAllBtnText}
        </Button>
      </Modal>
    </>
  );
};

export { UserNavigation };
