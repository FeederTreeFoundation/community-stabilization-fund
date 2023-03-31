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
  const [settingsState, setSettingsState] = useState<boolean>(false);
  const { user, error, isLoading } = useUser();
  
  const apiUserId = localStorage.getItem('api_user');
  const userPath = apiUserId ? `/admin/users/${apiUserId}` : '/admin/login';
  const deleteAllFormResponsesText = "WARNING: This will delete all existing form data!";

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
        <Link href='/api/auth/login'>
          <HeaderGlobalAction aria-label='Login' onClick={() => {}}>
            Login
          </HeaderGlobalAction>
        </Link>
      </HeaderGlobalBar>
    );
  }

  // TODO: Correct logic for displaying admin users
  return (
    <>
      <HeaderGlobalBar>
        { apiUserId && <HeaderGlobalAction
          aria-label='Settings'
          onClick={() => {
            setSettingsState(!settingsState);
          }}
        >
          <Settings />
        </HeaderGlobalAction>}
        <Link href={userPath}>
          <HeaderGlobalAction aria-label='My Profile' onClick={() => {}}>
            {user.org_id ? <UserAdmin /> : <User />}
          </HeaderGlobalAction>
        </Link>
        <Link href='/api/auth/logout'>
          <HeaderGlobalAction aria-label='Log Out' onClick={() => {}}>
            <Logout />
          </HeaderGlobalAction>
        </Link>
      </HeaderGlobalBar>
      <Modal
        open={settingsState}
        modalHeading='Reset form responses'
        modalLabel='Admin functions'
        passiveModal={true}
        size={'sm'}
        onRequestClose={() => setSettingsState(false)}
      >
        <p className='mb-2'>{deleteAllFormResponsesText}</p>
        <Button kind={'danger'} onClick={deleteAllFormResponses}>
          Reset
        </Button>
      </Modal>
    </>
  );
};

export { UserNavigation };
