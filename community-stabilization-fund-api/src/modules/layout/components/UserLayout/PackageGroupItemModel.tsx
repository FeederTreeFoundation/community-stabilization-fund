import { TextInput } from '@carbon/react';
import { Modal, Select, SelectItem } from 'carbon-components-react';
import { useForm } from 'react-hook-form';

import type { PackageGroupDTO } from '../../../../db';

// import { TextInput } from 'carbon-components';
interface PackageGroupItemModalProps {
  open: boolean;
  handleClose: (key: string) => void;
  onRequestClose: () => void;
  onRequestSubmit: (data?: any) => void;
  onSubmit: (data: PackageGroupDTO) => void;
}

const PackageGroupItemModal = ({
  customGroups,
  customItems,
  handleClose,
  open,
  onSubmit,
}: PackageGroupItemModalProps) => {
  const {
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm<PackageGroupDTO>();
  const form = watch();
  return (
    <Modal
      open={open}
      modalHeading='Add Package Group'
      modalLabel='Admin functions'
      primaryButtonText='Submit'
      secondaryButtonText='Cancel'
      size={'md'}
      onRequestSubmit={createPackageGroupItem}
      onRequestClose={() => handleClose('addPackageItemModal')}
    >
      <Select id='select-custom-group' labelText='Select custom group'>
        <SelectItem value='' text='' />
        {customGroups &&
          customGroups.map((customGroup) => (
            <SelectItem
              key={customGroup.id}
              value={customGroup.id}
              text={customGroup.name}
            />
          ))}
      </Select>
      <Select id='select-custom-item' labelText='Select custom item'>
        <SelectItem value='' text='' />
        {customItems &&
          customItems.map((customItem) => (
            <SelectItem
              key={customItem.id}
              value={customItem.id}
              text={customItem.name}
            />
          ))}
      </Select>
    </Modal>
  );
  function createPackageGroupItem() {
    onSubmit({
      ...form,
    });
    reset();
    handleClose('addPackageGroupItemModal');
  }
};

export default PackageGroupItemModal;
