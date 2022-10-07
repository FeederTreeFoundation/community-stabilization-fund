import { UserAdmin, Logout } from "@carbon/icons-react";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  Theme
} from "@carbon/react";
import Link from "next/link";

interface LayoutProps { children: JSX.Element };

const Layout = ({children}: LayoutProps) => (
  <div className="container">
    <Theme theme="g100">
      <Header aria-label="CMB Community Stabilization Fund">
        <Link href="/">
          <HeaderName prefix="CMB">Community Stabilization Fund</HeaderName>
        </Link>
        <HeaderNavigation aria-label="Community Stabilization Fund">
          <Link href="/form-responses">
            <HeaderMenuItem isCurrentPage={true}>Form Responses</HeaderMenuItem>
          </Link>
          <Link href="/checklists">
            <HeaderMenuItem>Checklists</HeaderMenuItem>
          </Link>
          <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
          <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
            <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Admin Name" onClick={() => {}}>
            <UserAdmin />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Sign Out" onClick={() => {}}>
            <Logout />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </Theme>
    {children}
  </div>
);

export { Layout };
