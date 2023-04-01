import {
  Header,
  HeaderNavigation,
  // HeaderMenu,
  // HeaderMenuItem,
  Theme
} from "@carbon/react";
import { useState } from "react";

import { ROUTES } from "../services/constants";

import { HeaderItem } from "./HeaderItem";
import { UserNavigation } from "./UserNavigation";

interface LayoutProps { children: JSX.Element }

const Layout = ({children}: LayoutProps) =>{
  const [selectedPage, setSelectedPage] = useState('');

  return (
    <div className="container">
      <Theme theme="g100">
        <Header aria-label="CMB Community Stabilization Fund">
          <HeaderItem route={ROUTES.root} prefix="CMB" />
          <HeaderNavigation aria-label="Community Stabilization Fund">
            <HeaderItem route={ROUTES["form-responses"]} selectedPage={selectedPage} changeSelectedPage={setSelectedPage} />
            <HeaderItem route={ROUTES["checklists"]} selectedPage={selectedPage} changeSelectedPage={setSelectedPage} />
            {/* <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu> */}
          </HeaderNavigation>
          <UserNavigation />
        </Header>
      </Theme>
      {children}
    </div>
  );
};

export { Layout };
