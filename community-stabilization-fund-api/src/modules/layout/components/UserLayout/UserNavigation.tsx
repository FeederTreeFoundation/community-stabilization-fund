import { useUser } from '@auth0/nextjs-auth0';
import { UserAdmin, Logout, User, Settings } from '@carbon/icons-react';
import {
  HeaderGlobalAction,
  HeaderGlobalBar,
  Link,
  SkeletonIcon,
} from 'carbon-components-react';
import { useContext, useEffect, useState } from 'react';

import type { ChecklistRuleDTO, QuestionDTO, UserDTO } from '../../../../db';
import type { BagItemsMap } from '../../../checklists/types';
import type { ChangeEvent } from 'react';

import { ChecklistRulesModal } from './ChecklistRulesModal';
import { QuestionsModal } from './QuestionsModal';
import { SettingsModal } from './SettingsModal';
import { ChecklistsRulesContext } from '../../..';
import { useStorage } from '../../../../hooks';
import { formResponseMock } from '../../../../mocks';
// import FormResponseService from '../../../../services/form-response';
import ChecklistRuleService from '../../../../services/checklist-rule';
import OrganizationService from '../../../../services/organization';
import QuestionService from '../../../../services/question';
import UserService from '../../../../services/user';
import { isEmpty } from '../../../../utils';
import { createInitialBagItemsMap } from '../../../checklists/utils';

interface UserNavigationProps {
  setDefaultBagLabelType?: (bagLabelType: string) => void;
}

const UserNavigation = ({
  setDefaultBagLabelType,
}: UserNavigationProps) => {
  const [openModalMapping, setOpenModalMapping] = useState<{[key: string]: boolean}>({});
  const [selectedPackage, setSelectedPackage] = useState<keyof BagItemsMap>('');
  const [customQuestions, setCustomQuestions] = useState<QuestionDTO[]>([]);
  const [apiUser, setApiUser] = useState<UserDTO>();

  const { updateRules, updateBagLabelType, bagLabelType } = useContext(ChecklistsRulesContext);

  const { state } = useStorage('api_user', '');
  const { user, error, isLoading } = useUser();

  const bagItemsMap = createInitialBagItemsMap(formResponseMock);
  const packageGroups = Object.keys(bagItemsMap);
  const packageItems = selectedPackage ? bagItemsMap[selectedPackage].map(item => item.name) : [];

  const apiUserId = state;
  const userPath = apiUserId ? `/admin/users/${apiUserId}` : '/admin/login';

  // const deleteAllFormResponses = async () => {
  //   const resp = await FormResponseService.deleteAllFormResponses();
  //   if (resp.status === 201) {
  //     handleClose('settingsModal');
  //   }
  // };

  const onPackageChange = (packageGroup?: string) => setSelectedPackage(packageGroup as keyof BagItemsMap);

  // Fetch API user on page load
  useEffect(() => {
    if (!apiUserId) return;

    UserService.getById(apiUserId)
      .then((res) => {
        if (res.data) {
          setApiUser(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error fetching API user');
      });
  }, [apiUserId]);

  // Set default bag label type with API user
  useEffect(() => {
    if(isEmpty(apiUser?.organization_id)) return;
    if(typeof setDefaultBagLabelType !== 'function') return;
    if(typeof updateRules !== 'function') return;
  
    OrganizationService.getById(`${apiUser?.organization_id}`)
      .then((res) => {
        if (res.data) {
          setDefaultBagLabelType(res.data.bag_label_type ?? '');
          setCustomQuestions(res.data.questions ?? []);
          updateRules(res.data.checklist_rules ?? []);
        }
      });
  }, [apiUser?.organization_id, setDefaultBagLabelType]);

  if (isLoading) {
    return (<HeaderGlobalBar><SkeletonIcon /></HeaderGlobalBar>);
  }

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

  return (
    <>
      <HeaderGlobalBar>
        { apiUserId && (
          <HeaderGlobalAction aria-label='Settings' onClick={() => handleOpen('settingsModal')} >
            <Settings />
          </HeaderGlobalAction>
        )}
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
      <SettingsModal 
        open={!!openModalMapping['settingsModal']}
        needsSetup={isEmpty(customQuestions)}
        handleOpen={handleOpen} 
        handleClose={handleClose} 
        handleChange={handleChange} 
      />
      <ChecklistRulesModal 
        packageGroups={packageGroups} 
        packageItems={packageItems} 
        openConfiguration={!!openModalMapping['checklistRulesModal']} 
        onRequestClose={() => handleClose('checklistRulesModal')} 
        onRequestSubmit={submitChecklistRules}
        onPackageChange={onPackageChange}
      />
      <QuestionsModal 
        user={apiUser}
        questions={customQuestions}
        open={!!openModalMapping['questionsModal']}
        handleClose={handleClose} 
        onSubmit={submitQuestion}
      />
    </>
  );

  function handleOpen(key: string) {
    setOpenModalMapping({[key]: true});
  }

  function handleClose(key: string) {
    setOpenModalMapping({[key]: false});
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if(typeof updateBagLabelType !== 'function') return;

    const bagLabelType = e.target.value;

    setTimeout(() => {
      OrganizationService.update({id: apiUser?.organization_id, bag_label_type: bagLabelType})
        .then((_res) => {
          updateBagLabelType(bagLabelType);
          alert('Bag label type updated!');
        })
        .catch((err) => console.error('updateBagLabelTypeError: ', err));
    }, 500);
  }

  function submitChecklistRules(data?: any) {
    if (typeof updateRules !== 'function') return;

    ChecklistRuleService.create(data)
      .then((resp) => {
        console.log('resp', resp);
        updateRules((prevRules: ChecklistRuleDTO[]) => (
          [data, ...prevRules]
        ));

      })
      .finally(() => handleClose('checklistRulesModal'))
      .catch((err) => console.error('submitChecklistRulesError: ', err));
  }

  function submitQuestion(data?: any) {
    QuestionService.create(data).then((_resp) => {
      setCustomQuestions((prevQuestions: QuestionDTO[]) => (
        [data, ...prevQuestions]
      ));
    })
      .finally(() => handleClose('questionsModal'))
      .catch((err) => console.error('submitQuestionError: ', err));
  }
};

export { UserNavigation };