import React from 'react';

import type { FormResponse } from '../../../db';

import { BagLabels } from './BagLabels';
import { formResponseMock } from '../../../mocks';
import {
  mapFormResponseToBagItems,
  mapFormResponseToRecipientInfo,
} from '../utils';

import { BagLabels, DymoBagLabelsOpOne } from './BagLabels';

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

  const packages_selected =
    typeof formResponse.packages_to_receive === 'string'
      ? formResponse.packages_to_receive.split(',')
      : formResponse.packages_to_receive;

  return (
    <div id='item-checklist' className={styles.item_checklist_wrapper}>
      <BagLabels
        recipientInfo={recipientInfo}
        bagItemsMap={bagItemsMap}
        packages={packages_selected}
        labelCount={labelCount}
      />
    </div>
  );
};

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
      <DymoBagLabelsOpOne
        recipientInfo={recipientInfo}
        bagItemsMap={bagItemsMap}
        packages={packages_selected}
        labelCount={labelCount}
      />
    </div>
  );
};

export { ItemChecklistByBag, ItemChecklistByBagDymo };
