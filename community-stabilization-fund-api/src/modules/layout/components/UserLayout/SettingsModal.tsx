import {
  Modal,
  Toggle,
  Button 
} from '@carbon/react';

import { useState } from "react";

import type { ChangeEvent} from "react";

import { ChecklistConfigSection } from "./ChecklistConfigSection";

import styles from '../../styles/UserLayout.module.css';

interface SettingsModalProps {
  open: boolean;
  needsSetup?: boolean;
  handleOpen: (key: string) => void;
  handleClose: (key: string) => void;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SettingsModal = ({
  open = false,
  needsSetup = false,
  handleOpen,
  handleClose,
  handleChange,
}: SettingsModalProps) => {
  const [showChecklistConfig, setShowChecklistConfig] = useState<boolean>(false);
  // const deleteAllFormResponsesText = "WARNING: This will delete all existing form data!";

  return (
    <Modal
      open={open}
      modalHeading='Settings'
      modalLabel='Admin functions'
      passiveModal={true}
      size={'sm'}
      onRequestClose={() => handleClose('settingsModal')}
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
          needsSetup ? (
            <Button kind={'primary'} onClick={() => handleOpen('questionsModal')}>
              Set Up Custom Form Questions
            </Button>
          ) : (
            <Button kind={'primary'} onClick={() => handleOpen('questionsModal')}>
              Update Form Questions
            </Button>
          ) 
        }
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
};

export { SettingsModal };