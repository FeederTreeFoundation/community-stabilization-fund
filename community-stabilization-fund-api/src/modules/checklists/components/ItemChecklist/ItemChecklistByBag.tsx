import { useContext } from 'react';

import type {FormResponse} from '../../../../db';

import {formResponseMock} from '../../../../mocks';
import { BAG_LABEL_TYPES } from '../../constants';
import { ChecklistsRulesContext } from '../../contexts';
import {
  createBagItems,
  mapFormResponseToBagItems,
  mapFormResponseToRecipientInfo,
} from '../../utils';

import { DymoBagLabels } from '../DymoLabels';
import { BagLabels } from '../SheetLabels';

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

  const { rules } = useContext(ChecklistsRulesContext);

  const packages_selected =
    typeof formResponse.packages_to_receive === 'string'
      ? formResponse.packages_to_receive.split(',')
      : formResponse.packages_to_receive;

  if(bagLabelType === BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE) {
    return (
      <DymoBagLabels
        recipientInfo={recipientInfo}
        packages={packages_selected}
        labelCount={labelCount}
        getBagItems={getBagItems}
      />
    );}

  return (
    <BagLabels
      recipientInfo={recipientInfo}
      bagItemsMap={bagItemsMap}
      packages={packages_selected}
      labelCount={labelCount}
      getBagItems={getBagItems}
    />
  );

  function getBagItems (label: string) {
    return createBagItems(label, bagItemsMap, rules, formResponse);
  }
};

export {ItemChecklistByBag};
