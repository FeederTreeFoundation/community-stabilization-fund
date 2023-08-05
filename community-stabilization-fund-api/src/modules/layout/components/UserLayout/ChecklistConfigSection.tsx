import { Button, Column } from "carbon-components-react";

import { BAG_LABEL_TYPES } from "../../../checklists";
import { BasicSelect } from "../../../../components";
import { ChangeEvent } from "react";

interface ChecklistConfigSectionProps {
  handleOpen: (key: string) => void;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ChecklistConfigSection = ({
  handleOpen,
  handleChange
}: ChecklistConfigSectionProps) => {
  const items = [BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE, BAG_LABEL_TYPES.SHEET_LABELS.OPTION_ONE]

  return (
    <Column className="mt-4">
      <Button kind={'primary'} size="lg" onClick={() => handleOpen('packageItemsModal')}>
        Configure Package Items
      </Button>
      <p className='mt-4'>
        <BasicSelect
          id='bag-label-type'
          items={items}
          noLabel
          defaultValue={BAG_LABEL_TYPES.SHEET_LABELS.OPTION_ONE}
          defaultText='Select type of bag labels'
          onChange={handleChange}
        />
      </p>
    </Column>
  )

};

export { ChecklistConfigSection }