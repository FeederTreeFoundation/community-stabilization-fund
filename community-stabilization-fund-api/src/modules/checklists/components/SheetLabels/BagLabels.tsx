import type {BagItemsMap} from '../../types';

import {RECIPIENT_INFORMATION_FIELDS} from '../../constants';

import {BagList} from '../BagList';

import styles from '../../styles/checklists.module.css';

interface BagLabelsProps {
  //TODO: Why would this have instances of undefined?
  recipientInfo: (string | number | undefined)[];
  bagItemsMap: BagItemsMap;
  packages?: string[];
  labelCount: number;
  getBagItems: (label: string) => string[];
}

const BagLabels = ({
  recipientInfo,
  labelCount,
  packages,
  getBagItems,
}: BagLabelsProps) => {
  const groceryTHead = 'Groceries Bag';
  const groceryItems = getBagItems('Groceries');

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

  const groceryItemLabels =
    packages?.includes('Food') &&
    BagList(
      grocerySlicePos,
      recipientInfoList,
      groceryTHead,
      groceryItems,
      labelCount
    );

  labelCount = 0;
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
      labelCount
    );

  labelCount = 0;
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
      labelCount
    );

  labelCount = 0;
  const feminineHygieneTHead = 'Menstrual Hygiene Bag';
  const feminineHygieneItems = getBagItems('Menstrual Hygiene');
  const feminineHygieneSlicePos = [[0, feminineHygieneItems.length]];
  const femineHygieneLabels =
    packages?.includes('Menstrual Hygiene Package') &&
    BagList(
      feminineHygieneSlicePos,
      recipientInfoList,
      feminineHygieneTHead,
      feminineHygieneItems,
      labelCount
    );

  return (
    <div className={styles.item_checklist_wrapper}>
      <div className={styles.bag_labels_wrapper}>
        <div className={styles.bag_labels}>{groceryItemLabels}</div>
        <div className={styles.bag_labels}>
          {generalHygieneLabels}
          {cleaningHealthSupplyLabels}
          {femineHygieneLabels}
        </div>
      </div>
    </div>
  );
};

export {BagLabels};
