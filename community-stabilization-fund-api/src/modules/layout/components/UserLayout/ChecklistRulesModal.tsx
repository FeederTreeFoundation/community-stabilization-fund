import { Checkbox, Modal } from 'carbon-components-react';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ChecklistRuleDTO } from '../../../../db';

import { BasicSelect } from '../../../../components/BasicSelect';

interface ChecklistRulesModalProps {
  packageGroups: string[];
  packageItems: string[];
  openConfiguration: boolean;
  onRequestClose: () => void;
  onRequestSubmit: (data?: ChecklistRuleDTO) => void;
  onPackageChange?: (data?: string) => void;
}

const ChecklistRulesModal = ({
  packageGroups,
  packageItems,
  openConfiguration,
  onRequestClose,
  onRequestSubmit,
  onPackageChange,
}: ChecklistRulesModalProps) => {
  const [isDelayed, setIsDelayed] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChecklistRuleDTO>();

  const packageGroup = watch('package_group.name');

  useEffect(() => {
    if (typeof onPackageChange !== 'function') return;
    if (packageGroup) onPackageChange(packageGroup);
  }, [packageGroup, onPackageChange]);

  return (
    <Modal
      open={openConfiguration}
      modalHeading='Configure Package Item Rules'
      modalLabel='Admin functions'
      primaryButtonText='Submit'
      secondaryButtonText='Cancel'
      size={'md'}
      onRequestClose={onRequestClose}
      onRequestSubmit={handleSubmit(onRequestSubmit)}
    >
      <p className='mt-2'>
        On label type
        <BasicSelect
          id='delay-dropdown'
          items={['Sheet Labels 4 x 2.5', 'Dymo Bag Label 2-5/16" x 4"']}
          noLabel
          defaultValue={0}
          defaultText='Select type of bag labels'
          {...register('bag_label_type', { required: true })}
          invalid={!!errors.bag_label_type}
          invalidText={errors.bag_label_type?.message}
        />
        In the package group
        <BasicSelect
          id='package-dropdown'
          items={packageGroups}
          noLabel
          defaultText='Choose a package'
          {...register('package_group.name', { required: true })}
          invalid={!!errors.package_group?.name}
          invalidText={errors.package_group?.name?.message}
        />
        there should be
        <BasicSelect
          id='quantity-dropdown'
          items={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          noLabel
          defaultText='Choose an item quantity'
          {...register('quantity', { required: true })}
          invalid={!!errors.quantity}
          invalidText={errors.quantity?.message}
        />
        per
        <BasicSelect
          id='item-dropdown'
          items={packageItems}
          noLabel
          defaultText='Choose an item'
          {...register('package_item.name', { required: true })}
          invalid={!!errors.package_item?.name}
          invalidText={errors.package_item?.name?.message}
        />
        for
        <BasicSelect
          id='household-members-dropdown'
          items={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          noLabel
          defaultText='Choose # of household members'
          {...register('household_members', { required: true })}
          invalid={!!errors.household_members}
          invalidText={errors.household_members?.message}
        />
        household members.
      </p>
      <p className='mt-4'>
        <Checkbox
          labelText={'Delay package item ' + (isDelayed ? ' by ' : '')}
          id='is-delayed-checkbox'
          onChange={() => setIsDelayed(!isDelayed)}
        />
        {isDelayed && (
          <>
            <BasicSelect
              id='delay-dropdown'
              items={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
              noLabel
              defaultText='Choose # of days'
              defaultValue={0}
              {...register('days_delayed_by')}
              invalid={!!errors.days_delayed_by}
              invalidText={errors.days_delayed_by?.message}
            />
            days and
            <BasicSelect
              id='delay-dropdown'
              items={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
              noLabel
              defaultValue={0}
              defaultText='Choose # of weeks'
              {...register('weeks_delayed_by')}
              invalid={!!errors.weeks_delayed_by}
              invalidText={errors.weeks_delayed_by?.message}
            />
            weeks.
          </>
        )}
      </p>
    </Modal>
  );
};

export { ChecklistRulesModal };
