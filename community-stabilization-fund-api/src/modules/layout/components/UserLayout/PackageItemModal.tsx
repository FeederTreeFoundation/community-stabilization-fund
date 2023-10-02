import { Modal } from 'carbon-components-react';
import { useForm } from 'react-hook-form';

interface PackageItemModalProps {
  open: boolean;
  handleClose: (key: string) => void;
  onRequestClose: () => void;
  onRequestSubmit: (data?: any) => void;
}

const PackageItemModal = ({
  handleClose,
  onRequestSubmit,
  open,
}: PackageItemModalProps) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  return (
    <Modal
      open={open}
      modalHeading='Add Package Item'
      modalLabel='Admin functions'
      primaryButtonText='Submit'
      secondaryButtonText='Cancel'
      size={'md'}
      onRequestClose={() => handleClose('addPackageItemModal')}
      onRequestSubmit={handleSubmit(onRequestSubmit)}
    >
      <p>Add Package Item</p>
    </Modal>
  );
};

export { PackageItemModal };
