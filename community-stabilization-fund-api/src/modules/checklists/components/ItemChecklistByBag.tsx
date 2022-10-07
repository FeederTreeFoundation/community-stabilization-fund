import React from "react";

import { BagItemsMap } from "../types";
import { formResponseMock } from "../../../mocks";
import { mapFormResponseToBagItems } from "../utils";

import { BagLabels } from "./BagLabels";

import styles from '../styles/checklists.module.css';

const bagItemsMock = mapFormResponseToBagItems(formResponseMock);
// TODO: Convert this to a 4x2.5 set of labels printed horizontally
export interface ItemChecklistByBagProps {
  bagItemsMap?: BagItemsMap
}

const ItemChecklistByBag = ({ bagItemsMap = bagItemsMock}: ItemChecklistByBagProps) => {
  let labelCount = 0;
  const bagItemsLabels = Object.keys(bagItemsMap);

  return (
    <div id="item-checklist" className={styles.item_checklist_wrapper}>
      {bagItemsLabels.map((label) => {
        return <BagLabels key={label} label={label} bagItemsMap={bagItemsMap} labelCount={labelCount} />;
      })}
    </div>
  );
};

export { ItemChecklistByBag };