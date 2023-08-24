import { useUser } from '@auth0/nextjs-auth0';
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
import { getRoles } from '../../../../utils';
import { ChecklistsRulesContext } from '../../../checklists';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const [selectedPage, setSelectedPage] = useState('');
  const [checklistRules, setChecklistRules] = useState<ChecklistRuleDTO[]>([]);
  const [currentBagLabelType, setCurrentBagLabelType] = useState<string>('');

  const { user } = useUser();
  const roles = getRoles(user);

  const checklistRulesCtx = { 
    rules: checklistRules, 
    bagLabelType: currentBagLabelType,
    updateRules: setChecklistRules, 
    updateBagLabelType: setCurrentBagLabelType,
  };

  useEffect(() => {
    ChecklistRuleService.getAll()
      .then(res => {
        setChecklistRules([...res.data]);
      })
      .catch(err => {
        console.error(err);
        alert('Error: Error fetching checklist rules');
      });
  }, []);

  return (
    <div className='container'>
      <ChecklistsRulesContext.Provider value={checklistRulesCtx}>
        <Theme theme='g100'>
          <Header aria-label='CMB Community Stabilization Fund'>
            <HeaderItem route={ROUTES.root} prefix='CMB' />
            <HeaderNavigation aria-label='Community Stabilization Fund'>
              <HeaderItem
                route={ROUTES['form-responses']}
                selectedPage={selectedPage}
                changeSelectedPage={setSelectedPage}
                hidden={!roles?.includes('admin')}
              />
              <HeaderItem
                route={ROUTES['checklists']}
                selectedPage={selectedPage}
                changeSelectedPage={setSelectedPage}
                hidden={!roles?.includes('admin')}
              />
              <HeaderItem
                route={ROUTES['volunteer-groceries-and-supplies']}
                selectedPage={selectedPage}
                changeSelectedPage={setSelectedPage}
                hidden={!roles?.some(role => ['admin', 'volunteer'].includes(role))}
              />
            </HeaderNavigation>
            <UserNavigation setDefaultBagLabelType={setCurrentBagLabelType} />
          </Header>
        </Theme>
        {children}
      </ChecklistsRulesContext.Provider>
    </div>
  );
};

export { UserLayout };
