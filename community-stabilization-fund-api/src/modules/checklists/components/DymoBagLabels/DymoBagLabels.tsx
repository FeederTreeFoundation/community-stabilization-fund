import {useContext} from 'react';

import type {FormResponse} from '../../../../db';
import type {BagItemsMap} from '../../types';

import DymoBagList from './DymoBagList';

import {RECIPIENT_INFORMATION_FIELDS} from '../../constants';
import {ChecklistsRulesContext} from '../../contexts';
import {createBagItems} from '../../utils';

import styles from './../../styles/DymoBag.module.css';

interface BagLabelsProps {
  //TODO: Why would this have instances of undefined?
  recipientInfo: (string | number | undefined)[];
  bagItemsMap: BagItemsMap;
  packages?: string[];
  labelCount: number;
}

const DymoBagLabels = ({
  recipientInfo,
  bagItemsMap,
  labelCount,
  packages,
}: BagLabelsProps) => {
  const {rules} = useContext(ChecklistsRulesContext);
  const household_members = recipientInfo[5];

  const groceryTHead = 'Groceries Bag';
  const groceryItems = createBagItems('Groceries', bagItemsMap, rules, {
    household_members,
  } as FormResponse);

  const getRecipientInfo = (text: string, id: number) => (
    <>
      <strong>{text}:</strong> {recipientInfo[id]}
    </>
  );

  const recipientInfoList = RECIPIENT_INFORMATION_FIELDS.slice(0, 4).map(
    (field, id) => (
      <p className={styles.dymo_recipient_info} key={field + id}>
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

  const groceryItemLabels =
    packages?.includes('Food') &&
    DymoBagList(
      grocerySlicePos,
      recipientInfoList,
      groceryTHead,
      groceryItems,
      labelCount
    );

  const generalHygieneTHead = 'General Hygiene Bag';
  const generalHygieneItems = createBagItems(
    'General Hygiene',
    bagItemsMap,
    rules,
    {
      household_members,
    } as FormResponse
  );
  const generalHygieneSlicePos = [[0, generalHygieneItems.length]];
  const generalHygieneLabels =
    packages?.includes('General Hygiene') &&
    DymoBagList(
      generalHygieneSlicePos,
      recipientInfoList,
      generalHygieneTHead,
      generalHygieneItems,
      labelCount
    );

  const cleaningHealthSupplyTHead = 'Cleaning/Health Supplies Bag';
  const cleaningHealthSupplyItems = createBagItems(
    'Cleaning/Health Supplies',
    bagItemsMap,
    rules,
    {
      household_members,
    } as FormResponse
  );
  const cleaningHealthSlicePos = [
    [0, 4],
    [4, cleaningHealthSupplyItems.length],
  ];
  const cleaningHealthSupplyLabels =
    packages?.includes('Cleaning/Health Supplies') &&
    DymoBagList(
      cleaningHealthSlicePos,
      recipientInfoList,
      cleaningHealthSupplyTHead,
      cleaningHealthSupplyItems,
      labelCount
    );

  const feminineHygieneTHead = 'Feminine Hygiene Bag';
  const feminineHygieneItems = createBagItems(
    'Feminine Hygiene',
    bagItemsMap,
    rules,
    {
      household_members,
    } as FormResponse
  );
  const feminineHygieneSlicePos = [
    [0, 3],
    [3, feminineHygieneItems.length],
    // [4, feminineHygieneItems.length],
  ];
  const femineHygieneLabels =
    packages?.includes('Feminine Health Care') &&
    DymoBagList(
      feminineHygieneSlicePos,
      recipientInfoList,
      feminineHygieneTHead,
      feminineHygieneItems,
      labelCount
    );
  return (
    <>
      <div>{groceryItemLabels}</div>
      <div>{generalHygieneLabels}</div>
      <div>{cleaningHealthSupplyLabels}</div>
      <div>{femineHygieneLabels}</div>
    </>
  );
};

export default DymoBagLabels;
