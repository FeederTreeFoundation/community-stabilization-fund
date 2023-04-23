import React from 'react';

import { formResponseMock } from '../../../mocks';

import {
  mapFormResponseToBagItems,
  mapFormResponseToRecipientInfo,
} from '../utils';

import { BagLabels } from './BagLabels';

import type { FormResponse } from '../../../db';

import styles from '../styles/checklists.module.css';

// TODO: Convert this to a 4x2.5 set of labels printed horizontally
export interface ItemChecklistByBagProps {
  formResponse?: FormResponse;
}

const ItemChecklistByBag = ({
  formResponse = formResponseMock,
}: ItemChecklistByBagProps) => {
  let labelCount = 0;
  const bagItemsMap = mapFormResponseToBagItems(formResponse);
  const recipientInfo = mapFormResponseToRecipientInfo(formResponse);

  return (
    <div id='item-checklist' className={styles.item_checklist_wrapper}>
      <BagLabels
        recipientInfo={recipientInfo}
        bagItemsMap={bagItemsMap}
        labelCount={labelCount}
      />
    </div>
  );
};

export { ItemChecklistByBag };
