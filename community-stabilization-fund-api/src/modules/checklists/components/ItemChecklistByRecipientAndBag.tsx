import React from "react";
import { ItemChecklistTableColumn } from "./ItemChecklistTableColumn";

import styles from '../styles/checklists.module.css';
import { formResponseMock } from "../../../mocks";
import { mapFormResponseToBagItems } from "../utils";

// TODO: Convert this to a 4x2.5 set of labels printed horizontally
export interface BagLabelsProps {

}

const BagLabels = ({}: BagLabelsProps) => {
  let labelCount = 0;
  const bagItemsMap = mapFormResponseToBagItems(formResponseMock);
  const bagItemsLabels = Object.keys(bagItemsMap);
  
  const bagLabels = bagItemsLabels.map((label) => {
    const thead = `${label} Bag`;

    if(label === 'Groceries') {
      const bagItems = bagItemsMap[label].map(item => `${item.name} (x${item.quantity})`);
      return(
        <>
          <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(0,1)}/>
          <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(1,4)}/>
          <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(4,6)}/>
          <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(6)}/>
        </>
      );
    }

    if(label === 'General Hygiene') {
      const bagItems = bagItemsMap[label].map(item => `${item.name} (x${item.quantity})`);
      return(
        <>
          <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems}/>
        </>
      );
    }

    if(label === 'Cleaning/Health Supplies') {
      const bagItems = bagItemsMap[label].map(item => `${item.name} (x${item.quantity})`);
      return(
        <>
          <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(0, 4)}/>
          <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(4)}/>
        </>
      );
    }

    if(label === 'Feminine Hygiene') {
      const bagItems = bagItemsMap[label].map(item => `${item.name} (x${item.quantity})`);
      return(
        <>
          <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems}/>
        </>
      );
    }
  });

  return (
    <div id="item-checklist" className={styles.item_checklist_wrapper}>
      {bagLabels}
    </div>
  );
};

export { BagLabels };