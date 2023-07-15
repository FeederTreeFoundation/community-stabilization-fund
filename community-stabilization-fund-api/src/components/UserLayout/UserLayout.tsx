import {
  Header,
  HeaderNavigation,
  // HeaderMenu,
  // HeaderMenuItem,
  Theme,
} from '@carbon/react';
import { useState } from 'react';

import type { ChecklistRule} from '../../modules/checklists';
import type { ReactNode} from 'react';

import { UserNavigation, HeaderItem } from './components/';
import { ChecklistsRulesContext } from '../../modules/checklists';
import { ROUTES } from '../../services/constants';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const [selectedPage, setSelectedPage] = useState('');
  const [checklistRules, setChecklistRules] = useState<ChecklistRule[]>([]);

  return (
    <div className='container'>
      <ChecklistsRulesContext.Provider value={{rules: checklistRules, updateRules: setChecklistRules}} >
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
        {children}
      </ChecklistsRulesContext.Provider>
    </div>
  );
};

export { UserLayout };
