import { createBagItems } from '../utils';
import { ItemChecklistTableColumn } from './ItemChecklistTableColumn';

import type { BagItemsMap } from '../types';

import styles from '../styles/checklists.module.css';

interface BagLabelsProps {
  bagItemsMap: BagItemsMap;
  labelCount: number;
}

const BagLabels = ({ bagItemsMap, labelCount }: BagLabelsProps) => {
  const groceryTHead = 'Groceries Bag';
  const groceryItems = createBagItems('Groceries', bagItemsMap);
  const groceryItemLabels = (
    <>
      <ItemChecklistTableColumn
        thead={groceryTHead + ` ${++labelCount}`}
        items={groceryItems.slice(0, 1)}
      />
      <ItemChecklistTableColumn
        thead={groceryTHead + ` ${++labelCount}`}
        items={groceryItems.slice(1, 4)}
      />
      <ItemChecklistTableColumn
        thead={groceryTHead + ` ${++labelCount}`}
        items={groceryItems.slice(4, 6)}
      />
      <ItemChecklistTableColumn
        thead={groceryTHead + ` ${++labelCount}`}
        items={groceryItems.slice(6)}
      />
    </>
  );

  labelCount = 0;
  const generalHygienceTHead = 'General Hygiene Bag';
  const generalHygieneItems = createBagItems('General Hygiene', bagItemsMap);
  const generalHygieneLabels = (
    <div>
      <ItemChecklistTableColumn
        thead={generalHygienceTHead + ` ${++labelCount}`}
        items={generalHygieneItems}
      />
    </div>
  );

  labelCount = 0;
  const cleaningHealthSupplyTHead = 'Cleaning/Health Supplies Bag';
  const cleaningHealthSupplyItems = createBagItems(
    'Cleaning/Health Supplies',
    bagItemsMap
  );
  const cleaningHealthSupplyLabels = (
    <>
      <ItemChecklistTableColumn
        thead={cleaningHealthSupplyTHead + ` ${++labelCount}`}
        items={cleaningHealthSupplyItems.slice(0, 4)}
      />
      <ItemChecklistTableColumn
        thead={cleaningHealthSupplyTHead + ` ${++labelCount}`}
        items={cleaningHealthSupplyItems.slice(4)}
      />
    </>
  );

  labelCount = 0;
  const feminineHygieneTHead = 'Feminine Hygiene Bag';
  const feminineHygieneItems = createBagItems('Feminine Hygiene', bagItemsMap);
  const femineHygieneLabels = (
    <>
      <ItemChecklistTableColumn
        thead={feminineHygieneTHead + ` ${++labelCount}`}
        items={feminineHygieneItems}
      />
    </>
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
