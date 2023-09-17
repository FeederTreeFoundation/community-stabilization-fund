import {
  Modal,
  Toggle,
  Button,
  Checkbox
} from '@carbon/react';

import { useContext, useState } from "react";

import type { OrganizationDTO } from '../../../../db';
import type { ChangeEvent} from "react";

import { ChecklistConfigSection } from "./ChecklistConfigSection";

import { isEmpty } from '../../../../utils';
import { FormQuestionsContext } from '../../../forms';

import styles from '../../styles/UserLayout.module.css';

interface SettingsModalProps {
  open: boolean;
  needsSetup?: boolean;
  handleOpen: (key: string) => void;
  handleClose: () => void;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSave?: (data: OrganizationDTO) => void;
}

const SettingsModal = ({
  open = false,
  needsSetup = false,
  handleOpen,
  handleClose,
  handleChange,
  handleSave
}: SettingsModalProps) => {
  const [showChecklistConfig, setShowChecklistConfig] = useState<boolean>(false);
  // const deleteAllFormResponsesText = "WARNING: This will delete all existing form data!";

  const { disableDefaultQuestions, updateDisableDefaultQuestions } = useContext(FormQuestionsContext);

  const defaultQuestionsDisabled = !isEmpty(disableDefaultQuestions) ? JSON.parse(disableDefaultQuestions) : {};

  return (
    <Modal
      open={open}
      modalHeading='Settings'
      modalLabel='Admin functions'
      passiveModal={true}
      size={'sm'}
      onRequestClose={onClose}
    >
      <div className={styles.settings_modal_body}>
        <Toggle 
          id="toggle-checklist-config"
          aria-label="toggle checklist configuration"
          labelText="Configure Checklists"
          hideLabel 
          onToggle={toggleChecklistConfig}
        />
        { showChecklistConfig && (
          <ChecklistConfigSection handleOpen={handleOpen} handleChange={handleChange} />
        )}
        {
          <Button kind={'primary'} onClick={() => handleOpen('questionModal')}>
            {needsSetup ? 'Set Up Custom Form Questions' : 'Update Form Questions'}
          </Button>
        }
        <fieldset className={`${styles.checkbox_group} mt-4`}>
          <div className='row'>
            <legend>Disable default questions on initial form?</legend>
          </div>
          <div className='row'>
            <Checkbox 
              id='disable-internal-default-questions'
              labelText={'internal'}
              checked={defaultQuestionsDisabled?.['disable-internal-default-questions']}
              onChange={onCheckboxChange}
            />
            <Checkbox 
              labelText={'public'}
              id='disable-public-default-questions'
              onChange={onCheckboxChange}
              checked={defaultQuestionsDisabled?.['disable-public-default-questions']}
            />
          </div>
        </fieldset>
          
        {/* 
          <p className='mt-4 mb-2'>{deleteAllFormResponsesText}</p>
          <Button kind={'danger'} onClick={deleteAllFormResponses}>
            Reset
          </Button> 
        */}
      </div>
    </Modal>
  );

  function toggleChecklistConfig(checked: boolean, _id?: string, _e?: ChangeEvent<HTMLInputElement>) {
    setShowChecklistConfig(checked);
  }

  function onCheckboxChange(_e: any, opts: {checked: boolean, id: string}) {
    if(typeof updateDisableDefaultQuestions !== 'function') return; 
    const { checked, id } = opts;
    
    const raw = disableDefaultQuestions? JSON.parse(disableDefaultQuestions) : {};
    updateDisableDefaultQuestions(JSON.stringify({...raw, [id]: checked}));
  }

  function onClose() {
    if(typeof handleSave === 'function') {
      const disable_default_questions_json = disableDefaultQuestions;

      handleSave({ disable_default_questions_json } as OrganizationDTO);
    }

    handleClose();
  }
};

export { SettingsModal };