import { useUser } from '@auth0/nextjs-auth0';
import { UserAdmin, Logout, User, Settings } from '@carbon/icons-react';
import {
  HeaderGlobalAction,
  HeaderGlobalBar,
  Link,
  Modal,
  Button,
  Toggle,
} from 'carbon-components-react';
import { useContext, useState } from 'react';

import type { ChecklistRule } from '../../..';
import type { BagItemsMap } from '../../../checklists/types';

import { ConfigurationModal } from './ConfigurationModal';
import { ChecklistsRulesContext } from '../../..';
import { formResponseMock } from '../../../../mocks';
import FormResponseService from '../../../../services/form-response';
import { createInitialBagItemsMap } from '../../../checklists/utils';
import { ChecklistConfigSection } from './ChecklistConfigSection';

const UserNavigation = () => {
  const [showChecklistConfig, setShowChecklistConfig] = useState<boolean>(false);
  const [openModalMapping, setOpenModalMapping] = useState<{[key: string]: boolean}>({})
  // const [openLabelsModal, setOpenLabelsModal] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [openConfiguration, setOpenConfiguration] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<keyof BagItemsMap>('');

  const { updateRules, updateBagLabelType } = useContext(ChecklistsRulesContext);
  const { user, error, isLoading } = useUser();

  const bagItemsMap = createInitialBagItemsMap(formResponseMock);
  const packageGroups = Object.keys(bagItemsMap);
  const packageItems = selectedPackage ? bagItemsMap[selectedPackage].map(item => item.name) : [];

  const apiUserId = localStorage.getItem('api_user');
  const userPath = apiUserId ? `/admin/users/${apiUserId}` : '/admin/login';
  const deleteAllFormResponsesText = "WARNING: This will delete all existing form data!";

  const deleteAllFormResponses = async () => {
    const resp = await FormResponseService.deleteAllFormResponses();
    if (resp.status === 201) {
      setOpenSettings(false);
    }
  };

  const updateChecklistRules = (data?: ChecklistRule) => {
    if (typeof updateRules !== 'function') return;

    updateRules((prevRules: ChecklistRule[]) => (
      [data, ...prevRules.filter(r => JSON.stringify(r) !== JSON.stringify(data))]
    ));
    onClose();
  };

  const onClose = () => setOpenConfiguration(false);

  const onPackageChange = (packageGroup?: string) => setSelectedPackage(packageGroup as keyof BagItemsMap);

  const handleOpen = (key: string) => setOpenModalMapping({[key]: true});
  const handleClose = (key: string) => setOpenModalMapping({[key]: false});

  if (isLoading) return <></>;

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

  // TODO: Correct logic for displaying admin users
  return (
    <>
      <HeaderGlobalBar>
        { apiUserId && <HeaderGlobalAction
          aria-label='Settings'
          onClick={() => {
            setOpenSettings(!openSettings);
          }}
        >
          <Settings />
        </HeaderGlobalAction>}
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
      <Modal
        open={openSettings}
        modalHeading='Settings'
        modalLabel='Admin functions'
        passiveModal={true}
        size={'sm'}
        onRequestClose={() => setOpenSettings(false)}
      >
        <Toggle id="toggle-5" aria-label="toggle button" labelText="Configure Checklists" hideLabel onClick={toggleChecklistConfig}/>
        { showChecklistConfig && <ChecklistConfigSection handleOpen={handleOpen} /> }
        <p className='mt-4 mb-2'>{deleteAllFormResponsesText}</p>
        <Button kind={'danger'} onClick={deleteAllFormResponses}>
          Reset
        </Button>
      </Modal>
      <ConfigurationModal 
        packageGroups={packageGroups} 
        packageItems={packageItems} 
        openConfiguration={!!openModalMapping['packageItemsModal']} 
        onRequestClose={() => handleClose('packageItemsModal')} 
        onRequestSubmit={updateChecklistRules}
        onPackageChange={onPackageChange}
      />
    </>
  );

  function toggleChecklistConfig(e: any) {
    setShowChecklistConfig(!showChecklistConfig)

    return e;
  }
};

export { UserNavigation };