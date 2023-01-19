import { useState, useEffect } from 'react';

import FormResponseServices from '../../../../src/services/form-response';
import { formResponseMock } from '../../../mocks';
import { omit } from '../../../utils';
import { RECIPIENT_INFORMATION_FIELDS } from '../constants';
import {
  mapFormResponseToBagItems,
  mapFormResponseToRecipientInfo,
} from '../utils';
import { ItemChecklistTableColumn } from './ItemChecklistTableColumn';

import type { FormResponse } from '../../../db';
import type { BagItemsMap } from '../types';

import styles from '../styles/checklists.module.css';
const recipientInfoMock = mapFormResponseToRecipientInfo(formResponseMock);
const bagItemsMock = mapFormResponseToBagItems(formResponseMock);

export interface ItemChecklistByRecipientProps {
  bagItemsMap?: BagItemsMap;
  recipientInfo?: (string | number)[];
}

const ItemChecklistByRecipient = ({
  bagItemsMap = bagItemsMock,
}: // recipientInfo = recipientInfoMock,
ItemChecklistByRecipientProps) => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  // Have to fix type error
  const [recipientInfo, setRecipientInfo] = useState<any>([]);

  useEffect(() => {
    const getResponses = async () => {
      const res = await FormResponseServices.getAllFormResponses();
      setFormResponses(res.data);
      const {
        first_name,
        last_name,
        phone_number,
        address_id,
        is_pick_up,
        has_flu_symptoms,
        household_members,
      } = res.data[0];
      setRecipientInfo([
        first_name,
        phone_number,
        address_id,
        is_pick_up,
        has_flu_symptoms,
        household_members,
      ]);
    };
    getResponses();
  }, []);
  const conditionalPunctuation = (text: string) =>
    text === 'COVID concern' ? '?' : ':';
  const getRecipientInfo = (text: string, id: number) =>
    `${text}${conditionalPunctuation(text)} ${recipientInfo[id]}`;

  const recipientInfoList = RECIPIENT_INFORMATION_FIELDS.map((field, id) => (
    <p key={field + id} className={styles.user_info__p}>
      {getRecipientInfo(field, id)}
    </p>
  ));

  // Only display Feminine Hygiene items if the recipient has them, otherwise guard against the field being passed
  const bagItemsObj: BagItemsMap = formResponseMock.feminine_health_care_id
    ? bagItemsMap
    : omit('Feminine Hygiene', bagItemsMap);

  const bagItemTables = Object.keys(bagItemsObj).map((key, id) => {
    const thead = key;
    const bagItems = bagItemsObj[key].map(
      (item) => `${item.name} (x${item.quantity})`
    );
    return (
      <ItemChecklistTableColumn
        thead={thead}
        key={key}
        items={bagItems}
        isFirstIndex={id === 0}
      />
    );
  });
  return (
    <div id='item-checklist-table' className={styles.item_checklist_wrapper}>
      <>
        <div className={styles.user_info}>{recipientInfoList}</div>

        <div className={styles.item_checklist_row}>
          {bagItemTables.slice(0, 2)}
        </div>
        <div className={styles.item_checklist_row}>
          {bagItemTables.slice(2, 4)}
        </div>
      </>
    </div>
  );
};

export { ItemChecklistByRecipient };
