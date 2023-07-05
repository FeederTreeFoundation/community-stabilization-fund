import {
  Header,
  HeaderNavigation,
  // HeaderMenu,
  // HeaderMenuItem,
  Theme,
} from '@carbon/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { ChecklistRule} from '../../modules/checklists';

import { ChecklistsRulesContext } from '../../modules/checklists';
import { ROUTES } from '../../services/constants';

import { UserNavigation, HeaderItem } from './components/';
interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const [selectedPage, setSelectedPage] = useState('');
  const [checklistRules, setChecklistRules] = useState<ChecklistRule[]>([]);

  const { pathname } = useRouter();
  const hiddenPaths = [
    '/',
    '/rent-mortgage-utilities-support',
    '/about/pittsburgh-collaborative',
    '/about/community-movement-builders',
    '/about/swope-dreams',
    '/donate',
  ];
  return (
    <div className='container'>
      <ChecklistsRulesContext.Provider value={{rules: checklistRules, updateRules: setChecklistRules}} >
        {!hiddenPaths.includes(pathname) && (
          <Theme theme='g100'>
            <Header aria-label='CMB Community Stabilization Fund'>
              <HeaderItem route={ROUTES.root} prefix='CMB' />
              <HeaderNavigation aria-label='Community Stabilization Fund'>
                <HeaderItem
                  route={ROUTES['form-responses']}
                  selectedPage={selectedPage}
                  changeSelectedPage={setSelectedPage}
                />
                <HeaderItem
                  route={ROUTES['checklists']}
                  selectedPage={selectedPage}
                  changeSelectedPage={setSelectedPage}
                />
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
        )}
        {children}
      </ChecklistsRulesContext.Provider>
    </div>
  );
};

export { Layout };
