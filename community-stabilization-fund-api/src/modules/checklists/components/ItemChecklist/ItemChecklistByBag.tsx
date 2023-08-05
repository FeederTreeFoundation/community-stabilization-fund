import React from 'react';

import type {FormResponse} from '../../../../db';

import { BAG_LABEL_TYPES } from '../../constants';
import {formResponseMock} from '../../../../mocks';
import {
  mapFormResponseToBagItems,
  mapFormResponseToRecipientInfo,
} from '../../utils';

import { BagLabels } from '../SheetLabels';
import { DymoBagLabels } from '../DymoLabels';

import styles from '../../styles/checklists.module.css';

// TODO: Convert this to a 4x2.5 set of labels printed horizontally
export interface ItemChecklistByBagProps {
  formResponse?: FormResponse;
  bagLabelType?: string;
}

const ItemChecklistByBag = ({
  formResponse = formResponseMock,
  bagLabelType = '',
}: ItemChecklistByBagProps) => {
  let labelCount = 0;
  const bagItemsMap = mapFormResponseToBagItems(formResponse);
  const recipientInfo = mapFormResponseToRecipientInfo(formResponse);

  const packages_selected =
    typeof formResponse.packages_to_receive === 'string'
      ? formResponse.packages_to_receive.split(',')
      : formResponse.packages_to_receive;

  if(bagLabelType === BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE) {
    return (
        <DymoBagLabels
          recipientInfo={recipientInfo}
          bagItemsMap={bagItemsMap}
          packages={packages_selected}
          labelCount={labelCount}
        />
  )};

  return (
      <BagLabels
        recipientInfo={recipientInfo}
        bagItemsMap={bagItemsMap}
        packages={packages_selected}
        labelCount={labelCount}
      />
  );
};

export {ItemChecklistByBag};
