import { TextInput } from '@carbon/react';
import { Modal } from 'carbon-components-react';
import { useForm } from 'react-hook-form';

import type { PackageGroupDTO } from '../../../../db';

// import { TextInput } from 'carbon-components';
interface PackageGroupModalProps {
  open: boolean;
  handleClose: (key: string) => void;
  onRequestClose: () => void;
  onRequestSubmit: (data?: any) => void;
  onSubmit: (data: PackageGroupDTO) => void;
}

const PackageGroupModal = ({
  handleClose,
  open,
  onSubmit,
}: PackageGroupModalProps) => {
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
      onRequestSubmit={createPackageGroup}
      onRequestClose={() => handleClose('addPackageItemModal')}
    >
      {' '}
      <TextInput
        labelText='Package Group Name'
        {...register('name', { required: true })}
      />
    </Modal>
  );
  function createPackageGroup() {
    onSubmit({
      ...form,
    } as PackageGroupDTO);
    reset();
    handleClose('addPackageGroupModal');
  }
};

export { PackageGroupModal };
