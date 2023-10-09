import { TextInput } from '@carbon/react';
import { Modal } from 'carbon-components-react';
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
      <TextInput
        labelText='Package group'
        {...register('name', { required: true })}
      />
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
