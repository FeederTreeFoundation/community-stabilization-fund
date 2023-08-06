import {BAG_LABEL_TYPES, RECIPIENT_INFORMATION_FIELDS} from '../../constants';

import { BagList } from '../BagList';

import styles from './../../styles/DymoBag.module.css';

interface BagLabelsProps {
  //TODO: Why would this have instances of undefined?
  recipientInfo: (string | number | undefined)[];
  packages?: string[];
  labelCount: number;
  getBagItems: (label: string) => string[];
}

const DymoBagLabels = ({
  recipientInfo,
  labelCount,
  packages,
  getBagItems
}: BagLabelsProps) => {
  const bagLabelType = BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE;
  const groceryTHead = 'Groceries Bag';
  const groceryItems = getBagItems('Groceries');
  
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
    BagList(
      grocerySlicePos,
      recipientInfoList,
      groceryTHead,
      groceryItems,
      labelCount,
      bagLabelType,
    );

  const generalHygieneTHead = 'General Hygiene Bag';
  const generalHygieneItems = getBagItems('General Hygiene');
  const generalHygieneSlicePos = [[0, generalHygieneItems.length]];
  const generalHygieneLabels =
    packages?.includes('General Hygiene') &&
    BagList(
      generalHygieneSlicePos,
      recipientInfoList,
      generalHygieneTHead,
      generalHygieneItems,
      labelCount,
      bagLabelType
    );

  const cleaningHealthSupplyTHead = 'Cleaning/Health Supplies Bag';
  const cleaningHealthSupplyItems = getBagItems('Cleaning/Health Supplies');
  const cleaningHealthSlicePos = [
    [0, 4],
    [4, cleaningHealthSupplyItems.length],
  ];
  const cleaningHealthSupplyLabels =
    packages?.includes('Cleaning/Health Supplies') &&
    BagList(
      cleaningHealthSlicePos,
      recipientInfoList,
      cleaningHealthSupplyTHead,
      cleaningHealthSupplyItems,
      labelCount,
      bagLabelType
    );

  const feminineHygieneTHead = 'Feminine Hygiene Bag';
  const feminineHygieneItems = getBagItems('Feminine Hygiene');
  const feminineHygieneSlicePos = [
    [0, 3],
    [3, feminineHygieneItems.length],
  ];
  const femineHygieneLabels =
    packages?.includes('Feminine Health Care') &&
    BagList(
      feminineHygieneSlicePos,
      recipientInfoList,
      feminineHygieneTHead,
      feminineHygieneItems,
      labelCount,
      bagLabelType
    );

  return (
    <div className={styles.item_checklist_dymo_wrapper}>
      <div>{groceryItemLabels}</div>
      <div>{generalHygieneLabels}</div>
      <div>{cleaningHealthSupplyLabels}</div>
      <div>{femineHygieneLabels}</div>
    </div>
  );
};

export { DymoBagLabels };
