import {
  Header,
  HeaderNavigation,
  // HeaderMenu,
  // HeaderMenuItem,
  Theme,
} from '@carbon/react';
import { useEffect, useState } from 'react';

import type { ChecklistRuleDTO, UserDTO } from '../../../../db';
import type { ReactNode} from 'react';

import { HeaderItem } from './HeaderItem';
import { UserNavigation } from './UserNavigation';
import { useStorage } from '../../../../hooks';
import ChecklistRuleService from '../../../../services/checklist-rule';
import { ROUTES } from '../../../../services/constants';
import OrganizationService from '../../../../services/organization';
import UserService from '../../../../services/user';
import { isEmpty } from '../../../../utils';
import { ChecklistsRulesContext } from '../../../checklists';
import { ApiUserContext } from '../../../users/contexts';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const [apiUser, setApiUser] = useState<UserDTO>();
  const [selectedPage, setSelectedPage] = useState('');
  const [checklistRules, setChecklistRules] = useState<ChecklistRuleDTO[]>([]);
  const [currentBagLabelType, setCurrentBagLabelType] = useState<string>('');
  const [error, setError] = useState<Error>();

  const {state} = useStorage('api_user', '');

  const apiUserCtx = {
    apiUser,
    updateApiUser: setApiUser,
  };

  const checklistRulesCtx = { 
    rules: checklistRules, 
    bagLabelType: currentBagLabelType,
    updateRules: setChecklistRules, 
    updateBagLabelType: setCurrentBagLabelType,
  };

  useEffect(() => {
    Promise.all([
      UserService.getById(state), ChecklistRuleService.getAll()
    ])
      .then(res => {
        if(res.length > 0) {
          res[0] && setApiUser(res[0].data as UserDTO);
          res[1] && setChecklistRules(res[1].data as ChecklistRuleDTO[]);
        }
      })
      .catch(err => {
        setError(err);
      });
  }, [state]);

  useEffect(() => {
    if(isEmpty(apiUser?.organization_id)) return;
  
    OrganizationService.getById(`${apiUser?.organization_id}`)
      .then((res) => {
        if (res.data) {
          console.log({res});
        
          setCurrentBagLabelType(res.data.bag_label_type ?? '');
        }
      });
  }, [apiUser?.organization_id]);

  if (error) {
    alert(error);
  }

  return (
    <div className='container'>
      <ApiUserContext.Provider value={apiUserCtx}>
        <ChecklistsRulesContext.Provider value={checklistRulesCtx}>
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
                {/*
                  <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                  <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                  </HeaderMenu> 
                */}
              </HeaderNavigation>
              <UserNavigation />
            </Header>
          </Theme>
          {children}
        </ChecklistsRulesContext.Provider>
      </ApiUserContext.Provider>
    </div>
  );
};

export { UserLayout };
