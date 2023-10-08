import { useUser } from '@auth0/nextjs-auth0';
import { UserAdmin, Logout, User, Settings } from '@carbon/icons-react';
import {
  HeaderGlobalAction,
  HeaderGlobalBar,
  Link,
  SkeletonIcon,
} from '@carbon/react';
import { useContext, useEffect, useRef, useState } from 'react';

import type { ChecklistRuleDTO, FormDTO, OrganizationDTO, QuestionDTO } from '../../../../db';
import type { BagItemsMap } from '../../../checklists/types';
import type { ChangeEvent } from 'react';

import { ChecklistRulesModal } from './ChecklistRulesModal';
import { QuestionModal } from './QuestionModal';
import { SettingsModal } from './SettingsModal';
import { useStorage } from '../../../../hooks';
import { formResponseMock } from '../../../../mocks';
import ChecklistRuleService from '../../../../services/checklist-rule';
import OrganizationService from '../../../../services/organization';
import QuestionService from '../../../../services/question';
import { isEmpty } from '../../../../utils';
import { ChecklistsRulesContext } from '../../../checklists';
import { createInitialBagItemsMap } from '../../../checklists/utils';
import { FormQuestionsContext } from '../../../forms';

interface UserNavigationProps {
  updateDefaultBagLabelType?: (bagLabelType: string) => void;
  updateDisableDefaultQuestions?: (json: string) => void;
}

const UserNavigation = ({
  updateDefaultBagLabelType,
  updateDisableDefaultQuestions,
}: UserNavigationProps) => {
  const [openModalMapping, setOpenModalMapping] = useState<{[key: string]: boolean}>({});
  const [selectedPackage, setSelectedPackage] = useState<keyof BagItemsMap>('');

  const formsRef = useRef<FormDTO[]>([]);

  const { updateRules, updateBagLabelType } = useContext(ChecklistsRulesContext);
  const { questions, updateQuestions } = useContext(FormQuestionsContext);

  const { state: apiUserId  } = useStorage('api_user_id', '');
  const { state: organizationId } = useStorage('organization_id', '');
  const { user, error, isLoading } = useUser();

  const bagItemsMap = createInitialBagItemsMap(formResponseMock);
  const packageGroups = Object.keys(bagItemsMap);
  const packageItems = selectedPackage ? bagItemsMap[selectedPackage].map(item => item.name) : [];

  const userPath = apiUserId ? `/admin/users/${apiUserId}` : '/admin/login';

  // const deleteAllFormResponses = async () => {
  //   const resp = await FormResponseService.deleteAllFormResponses();
  //   if (resp.status === 201) {
  //     handleClose('settingsModal');
  //   }
  // };
  
  const onPackageChange = (packageGroup?: string) => setSelectedPackage(packageGroup as keyof BagItemsMap);

  useEffect(() => {
    if(isEmpty(organizationId)) return;
    if(typeof updateDefaultBagLabelType !== 'function') return;
    if(typeof updateRules !== 'function') return;
    if(typeof updateQuestions !== 'function') return;
    if(typeof updateDisableDefaultQuestions !== 'function') return;

    OrganizationService.getById(`${organizationId}`)
      .then((res) => {
        const found = res.data.api_keys?.find((key) => `${key.api_user_id}` === `${apiUserId}`);
        
        if (found) {
          updateDefaultBagLabelType(res.data.bag_label_type ?? '');
          updateQuestions(res.data.questions ?? []);
          updateRules(res.data.checklist_rules ?? []);
          updateDisableDefaultQuestions(res.data.disable_default_questions_json ?? '');
          formsRef.current = res.data.forms ?? [];
        }
      });
  }, [
    apiUserId,
    organizationId,
    updateDefaultBagLabelType,
    updateRules,
    updateQuestions,
    updateDisableDefaultQuestions
  ]);

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
        needsSetup={isEmpty(questions)}
        handleOpen={handleOpen} 
        handleClose={() => handleClose('settingsModal')} 
        handleChange={onBagLabelTypeChange}
        handleSave={saveSettings}
      />
      <ChecklistRulesModal 
        packageGroups={packageGroups} 
        packageItems={packageItems} 
        openConfiguration={!!openModalMapping['checklistRulesModal']} 
        onRequestClose={() => handleClose('checklistRulesModal')} 
        onRequestSubmit={submitChecklistRule}
        onPackageChange={onPackageChange}
      />
      <QuestionModal 
        questions={questions}
        forms={formsRef.current}
        open={!!openModalMapping['questionModal']}
        handleClose={() => handleClose('questionModal')} 
        onSubmit={submitQuestion}
        onDelete={handleDeleteQuestion}
      />
    </>
  );

  function handleOpen(key: string) {
    setOpenModalMapping({[key]: true});
  }

  function handleClose(key: string) {
    setOpenModalMapping({[key]: false});
  }

  function onBagLabelTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    if(typeof updateBagLabelType !== 'function') return;

    const bagLabelType = e.target.value;

    setTimeout(() => {
      OrganizationService.update({id: organizationId, bag_label_type: bagLabelType})
        .then((_res) => {
          updateBagLabelType(bagLabelType);
          alert('Bag label type updated!');
        })
        .catch((err) => console.error('updateBagLabelTypeError: ', err));
    }, 500);
  }

  // TODO: Replace onBagLabelTypeChange with this function
  function saveSettings(data: OrganizationDTO) {
    OrganizationService.update({...data, id: organizationId})
      .then((_res) => {
        // updateBagLabelType(data.bag_label_type ?? '');
        handleClose('settingsModal');
        alert('Settings saved!');
      })
      .catch((err) => {
        console.error('updateBagLabelTypeError: ', err);
        alert('Error saving settings.. Please try again.');
      });

  }

  function submitChecklistRule(data?: any) {
    if (typeof updateRules !== 'function') return;

    ChecklistRuleService.create({...data, organization_id: organizationId})
      .then((_) => {
        updateRules((prevRules: ChecklistRuleDTO[]) => (
          [data, ...prevRules]
        ));

      })
      .finally(() => handleClose('checklistRulesModal'))
      .catch((err) => console.error('submitChecklistRuleError: ', err));
  }

  function submitQuestion(data?: any) {
    if(typeof updateQuestions !== 'function') return;

    const { id = '', ...rest } = data;
    const question = { 
      ...rest, 
      last_updated_by: user?.email ?? '', 
      last_updated: new Date()
    } as QuestionDTO;
    
    if(!isEmpty(id)) {
      QuestionService.update({...question, id}).then(() => {
        console.log({question});
        updateQuestions([
          ...questions.filter(q => `${q.id}` !== `${id}`), 
          question
        ]);
      })
        .finally(() => handleClose('questionModal'))
        .catch((err) => console.error('submitQuestionError: ', err)); 
    }

    QuestionService.create(question).then(() => {
      updateQuestions([...questions, question]);
    })
      .finally(() => handleClose('questionModal'))
      .catch((err) => console.error('submitQuestionError: ', err));
  }

  function handleDeleteQuestion(id: number) {
    if(typeof updateQuestions !== 'function') return;

    QuestionService.delete({id}).then(() => {
      updateQuestions([...questions.filter(q => `${q.id}` !== `${id}`)]);
    })
      .catch((err) => console.error('deleteQuestionError: ', err));
  }
};

export { UserNavigation };