import {
  Header,
  HeaderNavigation,
  // HeaderMenu,
  // HeaderMenuItem,
  Theme,
} from '@carbon/react';
import { useEffect, useState } from 'react';

import type { ChecklistRuleDTO } from '../../../../db';
import type { ReactNode} from 'react';

import { HeaderItem } from './HeaderItem';
import { UserNavigation } from './UserNavigation';
import ChecklistRuleService from '../../../../services/checklist-rule';
import { ROUTES } from '../../../../services/constants';
import { ChecklistsRulesContext } from '../../../checklists';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const [selectedPage, setSelectedPage] = useState('');
  const [checklistRules, setChecklistRules] = useState<ChecklistRuleDTO[]>([]);
  const [currentBagLabelType, setCurrentBagLabelType] = useState<string>('');
  const [error, setError] = useState<Error>();
  const ctxValue = { 
    rules: checklistRules, 
    bagLabelType: currentBagLabelType,
    updateRules: setChecklistRules, 
    updateBagLabelType: setCurrentBagLabelType,
  };

  useEffect(() => {
    ChecklistRuleService.getAllChecklistRules().then(res => {
      const { error } = res.data as any;
      if (error) {
        console.error(error);
        setError(error);
      } else {
        setChecklistRules(res.data as ChecklistRuleDTO[]);
      }
    });
  }, []);

  if (error) {
    alert(error);
  }

  return (
    <div className='container'>
      <ChecklistsRulesContext.Provider value={ctxValue}>
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
