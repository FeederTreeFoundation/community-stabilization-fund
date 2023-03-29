import React from 'react';

import { formResponseMock } from '../../../mocks';

import { mapFormResponseToBagItems } from '../utils';

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
  const bagItemsLabels = Object.keys(bagItemsMap);

  return (
    <div id='item-checklist' className={styles.item_checklist_wrapper}>
      <BagLabels bagItemsMap={bagItemsMap} labelCount={labelCount} />
    </div>
  );
};

export { ItemChecklistByBag };
