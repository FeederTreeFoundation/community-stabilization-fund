import { TextInput, Select, SelectItem } from '@carbon/react';
import { Modal } from 'carbon-components-react';
import { useForm } from 'react-hook-form';

import type { PackageItemDTO } from '../../../../db';

interface PackageItemModalProps {
  open: boolean;
  handleClose: (key: string) => void;
  onRequestClose: () => void;
  onRequestSubmit: (data?: any) => void;
  onSubmit: (data: PackageItemDTO) => void;
  packageItem: PackageItemDTO;
}

const PackageItemModal = ({
  // packageGroups,
  handleClose,
  open,
  onSubmit,
}: PackageItemModalProps) => {
  const {
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm<PackageItemDTO>();
  const form = watch();
  return (
    <Modal
      open={open}
      modalHeading='Add Package Item'
      modalLabel='Admin functions'
      primaryButtonText='Submit'
      secondaryButtonText='Cancel'
      size={'md'}
      onRequestSubmit={createPackageItem}
      onRequestClose={() => handleClose('addPackageItemModal')}
    >
      {/* <Select
        labelText='Select a package group'
        {...register('packageGroup', { required: true })}
      >
        <SelectItem value='' text='' />
        {packageGroups.map((group, id) => (
          <SelectItem key={id} value={id} text={group} />
        ))}
      </Select> */}
      <TextInput
        labelText='Package Item Name'
        {...register('name', { required: true })}
      />
    </Modal>
  );
  function createPackageItem() {
    onSubmit({
      ...form,
    } as PackageItemDTO);
    reset();
    handleClose('addPackageItemModal');
  }
};

export { PackageItemModal };
