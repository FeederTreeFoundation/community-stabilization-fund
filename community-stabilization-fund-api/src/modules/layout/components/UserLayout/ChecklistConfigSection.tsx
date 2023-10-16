import { Button, Column } from 'carbon-components-react';

import type { ChangeEvent } from 'react';

import { BasicSelect } from '../../../../components';
import { BAG_LABEL_TYPES } from '../../../checklists';

interface ChecklistConfigSectionProps {
  handleOpen: (key: string) => void;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ChecklistConfigSection = ({
  handleOpen,
  handleChange,
}: ChecklistConfigSectionProps) => {
  const items = [
    BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE,
    BAG_LABEL_TYPES.SHEET_LABELS.OPTION_ONE,
  ];

  return (
    <Column>
      <Button
        kind={'primary'}
        onClick={() => handleOpen('checklistRulesModal')}
      >
        Configure Package Item Rules
      </Button>
      <Button
        kind={'primary'}
        onClick={() => handleOpen('addPackageItemModal')}
      >
        Add Package Item
      </Button>
      <Button
        kind={'primary'}
        onClick={() => handleOpen('addPackageGroupModal')}
      >
        Add Package Group
      </Button>
      <Button
        kind={'primary'}
        onClick={() => handleOpen('addPackageGroupItemModal')}
      >
        Add Package Group Item
      </Button>
      <p className='mt-4'>
        <BasicSelect
          id='bag-label-type'
          items={items}
          labelText='Select Default Bag Labels'
          defaultValue={BAG_LABEL_TYPES.SHEET_LABELS.OPTION_ONE}
          defaultText='Select type of bag labels'
          onChange={handleChange}
        />
      </p>
    </Column>
  );
};

export { ChecklistConfigSection };
