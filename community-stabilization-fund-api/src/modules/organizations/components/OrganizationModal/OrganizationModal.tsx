import { 
  Modal,
  Row,
  TextInput,
  Heading,
  Section,
} from '@carbon/react';
import { useForm } from 'react-hook-form';

import type { OrganizationDTO } from '../../../../db';

import { BasicSelect } from '../../../../components';
import { isEmpty } from '../../../../utils';

import { BAG_LABEL_TYPES } from '../../../checklists';

import styles from '../../styles/OrganizationModal.module.css';

export interface OrganizationModalProps {
  selectedOrganization?: OrganizationDTO;
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: OrganizationDTO) => void;
}

const OrganizationModal = ({
  selectedOrganization,
  open,
  handleClose,
  onSubmit,
}: OrganizationModalProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationDTO>({ defaultValues: selectedOrganization });
  
  const mode = isEmpty(selectedOrganization) ? 'add' : 'edit';
  const bagLabelTypes = Object.values(BAG_LABEL_TYPES).map(item => item.OPTION_ONE);
  
  return (
    <Modal
      open={open}
      className={styles.organizations_modal}
      modalHeading='Configure Organizations'
      modalLabel='Admin functions'
      size={'md'}
      primaryButtonText='Submit'
      secondaryButtonText={'Cancel'}
      onRequestSubmit={handleSubmit(submitOrganization)}
      onSecondarySubmit={closeModal}
      onRequestClose={closeModal}
      preventCloseOnClickOutside
    >
      <Row className={styles.question_form_wrapper}>
        <Section level={4}>
          <div className='row'>
            <div className='column' >
              <Heading className={`${styles.heading} mb-2`} size='sm'>{`${mode.toUpperCase()} ORGANIZATION`}</Heading>
            </div>
            {/* <div className='column mr-4'>
              {mode === 'edit' && <Button kind='danger--ghost' size='sm' onClick={deleteOrganization}>
                  Delete
              </Button>}
            </div> */}
          </div>
          <TextInput
            id='name'
            className='mt-2'
            labelText='Organization Name'
            defaultValue={selectedOrganization?.name ?? ''}
            {...register('name', { required: true })}
            invalid={!!errors.name}
            invalidText={errors.name?.message}
          />
          <TextInput
            id='short_name'
            className='mt-2'
            labelText='Organization Short Name'
            defaultValue={selectedOrganization?.short_name ?? ''}
            {...register('short_name', { required: true })}
            invalid={!!errors.short_name}
            invalidText={errors.short_name?.message}
          />
          <BasicSelect 
            id='bag_label_type'
            className='mt-2'
            items={bagLabelTypes}
            defaultValue={selectedOrganization?.bag_label_type ?? ''}
            labelText='Default Bag Label Type'
            {...register('bag_label_type', { required: true })}
            invalid={!!errors.bag_label_type}
          />
        </Section>
      </Row>
    </Modal>
  );
  function submitOrganization(data: OrganizationDTO) {
    if(typeof onSubmit !== 'function') return;
    onSubmit(data);
  }

  function closeModal() {
    if(typeof handleClose !== 'function') return;

    // TODO: Figure out how to properly reset form state
    reset();
    handleClose();
  }
};

export { OrganizationModal };