import React from "react";
import { ItemChecklistTableColumn } from "./ItemChecklistTableColumn";

import styles from '../styles/checklists.module.css';
import { formResponseMock } from "../../../mocks";
import { mapFormResponseToBagItems } from "../utils";

// TODO: Convert this to a 4x2.5 set of labels printed horizontally
export interface BagLabelsProps {

}

const BagLabels = ({}: BagLabelsProps) => {
// const bagItemLabels = createBagItemMap();
  const thead = `Grocery Items Bag ${1}`;
  const bagItems = mapFormResponseToBagItems(formResponseMock).Groceries.map(item => `${item.name} (x${item.quantity})`);
  return (
    <div id="item-checklist" className={styles.item_checklist_wrapper}>
      <ItemChecklistTableColumn thead={thead} items={bagItems.slice(0,4)}/>
      <ItemChecklistTableColumn thead={thead} items={bagItems.slice(4)}/>
    </div>
  );
};

export { BagLabels };