import { TextInput } from '@carbon/react';
import { Modal } from 'carbon-components-react';
import { useForm } from 'react-hook-form';

import type { PackageItemDTO } from '../../../../db';
// import { TextInput } from 'carbon-components';
interface PackageItemModalProps {
  open: boolean;
  handleClose: (key: string) => void;
  onRequestClose: () => void;
  onRequestSubmit: (data?: any) => void;
  onSubmit: (data: PackageItemDTO) => void;
  packageItem: PackageItemDTO;
}

const PackageItemModal = ({
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
      <TextInput
        labelText='Item to add'
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
