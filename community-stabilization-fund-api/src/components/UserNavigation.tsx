import { useUser } from '@auth0/nextjs-auth0';
import { UserAdmin, Logout, Login, User } from '@carbon/icons-react';
import {
  HeaderGlobalAction,
  HeaderGlobalBar,
  Link,
} from 'carbon-components-react';

const UserNavigation = () => {
  const { user, error, isLoading } = useUser();

  const userId = localStorage.getItem('api_user');
  const userPath = userId ? `/admin/users/${userId}` : '/admin/login';

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
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label='My Profile' onClick={() => {}}>
        <Link href={userPath}>
          {user.org_id ? <UserAdmin /> : <User />}
        </Link>
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label='Log Out' onClick={() => {}}>
        <Link href='/api/auth/logout'>
          <Logout />
        </Link>
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  );
};

export { UserNavigation };
