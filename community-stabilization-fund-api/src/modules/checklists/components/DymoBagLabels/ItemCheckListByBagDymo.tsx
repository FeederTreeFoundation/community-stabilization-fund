import React from 'react';

import type { ItemChecklistByBagProps } from '../ItemChecklistByBag';

import DymoBagLabels from './DymoBagLabels';

import { formResponseMock } from '../../../../mocks';
import {
  mapFormResponseToBagItems,
  mapFormResponseToRecipientInfo,
} from '../../utils';

import styles from './../../styles/DymoBag.module.css';

const ItemChecklistByBagDymo = ({
  formResponse = formResponseMock,
}: ItemChecklistByBagProps) => {
  let labelCount = 0;
  const bagItemsMap = mapFormResponseToBagItems(formResponse);
  const recipientInfo = mapFormResponseToRecipientInfo(formResponse);

  const packages_selected =
    typeof formResponse.packages_to_receive === 'string'
      ? formResponse.packages_to_receive.split(',')
      : formResponse.packages_to_receive;
  return (
    <div id='item-checklist' className={styles.item_checklist_dymo_wrapper}>
      <DymoBagLabels
        recipientInfo={recipientInfo}
        bagItemsMap={bagItemsMap}
        packages={packages_selected}
        labelCount={labelCount}
      />
    </div>
  );
};

export default ItemChecklistByBagDymo;
