import { useContext } from 'react';

import type { FormResponse } from '../../../db';
import type { BagItemsMap } from '../types';

import BagList from './BagList';
import { RECIPIENT_INFORMATION_FIELDS } from '../constants';
import { ChecklistsRulesContext } from '../contexts';
import { createBagItems } from '../utils';


import styles from '../styles/checklists.module.css';

interface BagLabelsProps {
  //TODO: Why would this have instances of undefined?
  recipientInfo: (string | number | undefined)[];
  bagItemsMap: BagItemsMap;
  packages?: string[]
  labelCount: number;
}

const BagLabels = ({
  recipientInfo,
  bagItemsMap,
  labelCount,
  packages
}: BagLabelsProps) => {
  const { rules } = useContext(ChecklistsRulesContext);

  const household_members = recipientInfo[5];
  const groceryTHead = 'Groceries Bag';
  const groceryItems = createBagItems('Groceries', bagItemsMap, rules, { household_members } as FormResponse);

  const getRecipientInfo = (text: string, id: number) => (
    <>
      <strong>{text}:</strong> {recipientInfo[id]}
    </>
  );

  const recipientInfoList = RECIPIENT_INFORMATION_FIELDS.slice(0, 3).map(
    (field, id) => (
      <p key={field + id} className={styles.user_bag_label_info__p}>
        {getRecipientInfo(field, id)}
      </p>
    )
  );
  const grocerySlicePos = [
    [0, 1],
    [1, 4],
    [4, 6],
    [6, groceryItems.length],
  ];

  const groceryItemLabels = packages?.includes('Food') && BagList(
    grocerySlicePos,
    recipientInfoList,
    groceryTHead,
    groceryItems,
    labelCount
  );

  labelCount = 0;
  const generalHygieneTHead = 'General Hygiene Bag';
  const generalHygieneItems = createBagItems('General Hygiene', bagItemsMap, rules, { household_members } as FormResponse);
  const generalHygieneSlicePos = [[0, generalHygieneItems.length]];
  const generalHygieneLabels = packages?.includes('General Hygiene') && BagList(
    generalHygieneSlicePos,
    recipientInfoList,
    generalHygieneTHead,
    generalHygieneItems,
    labelCount
  );

  labelCount = 0;
  const cleaningHealthSupplyTHead = 'Cleaning/Health Supplies Bag';
  const cleaningHealthSupplyItems = createBagItems(
    'Cleaning/Health Supplies',
    bagItemsMap,
    rules,
    { household_members } as FormResponse
  );
  const cleaningHealthSlicePos = [
    [0, 4],
    [4, cleaningHealthSupplyItems.length],
  ];
  const cleaningHealthSupplyLabels = packages?.includes('Cleaning/Health Supplies') && BagList(
    cleaningHealthSlicePos,
    recipientInfoList,
    cleaningHealthSupplyTHead,
    cleaningHealthSupplyItems,
    labelCount
  );

  labelCount = 0;
  const feminine_health_care = { feminine_members: recipientInfo[6] };
  const feminineHygieneTHead = 'Feminine Hygiene Bag';
  const feminineHygieneItems = createBagItems('Feminine Hygiene', bagItemsMap, rules, { feminine_health_care } as FormResponse);
  const feminineHygieneSlicePos = [[0, feminineHygieneItems.length]];
  const femineHygieneLabels = packages?.includes('Feminine Health Care') && BagList(
    feminineHygieneSlicePos,
    recipientInfoList,
    feminineHygieneTHead,
    feminineHygieneItems,
    labelCount
  );

  return (
    <div className={styles.bag_labels_wrapper}>
      <div className={styles.bag_labels}>{groceryItemLabels}</div>
      <div className={styles.bag_labels}>
        {generalHygieneLabels}
        {cleaningHealthSupplyLabels}
        {femineHygieneLabels}
      </div>
    </div>
  );
};

export { BagLabels };
