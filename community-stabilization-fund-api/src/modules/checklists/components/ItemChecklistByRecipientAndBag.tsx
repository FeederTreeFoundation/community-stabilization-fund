import React from "react";
import { ItemChecklistTableColumn } from "./ItemChecklistTableColumn";

import styles from '../styles/checklists.module.css';
import { formResponseMock, bagItemsMock } from "../../../mocks";
import { FormResponse } from "../../../db/models";


// TODO: Convert this to a 4x2.5 set of labels printed horizontally
export interface BagLabelsProps {

}

const BagLabels = ({}: BagLabelsProps) => {
// const bagItemLabels = createBagItemMap();
  const thead = `Grocery Items Bag ${1}`;
  const bagItems = createBagItemMap(formResponseMock).Groceries.map(item => `${item.name} (x${item.quantity})`);
  return (
    <div id="item-checklist" className={styles.item_checklist_wrapper}>
      <ItemChecklistTableColumn thead={thead} items={bagItems.slice(0,4)}/>
      <ItemChecklistTableColumn thead={thead} items={bagItems.slice(4)}/>
    </div>
  );
};

export const createBagItemMap = (formResponse: FormResponse) => {
  if(0 >= formResponse.household_members || formResponse.household_members <= 3){}  // if(bool == 0 ) {
  // console.log({bool})
  //     if( bool === 0 ) {
  //         document.write('condition met')
  //     }
  //     else {
  //         console.log(typeof bool) //number === number
  //     }
  // } else {
  //     document.write('condition not met')
  // }
  return({
    "Groceries": [
      { name: "Chicken", quantity: formResponse.household_members <= 3 ? 1 : 2 },
      { name: "Eggs", quantity: formResponse.household_members <= 3 ? 1 : 2 },
      { name: "Cereal", quantity: 1},
      { name: "Bread", quantity: formResponse.household_members <= 3 ? 1 : 2 },
      { name: "Canned Green Beans", quantity: formResponse.household_members <= 3 ? 2 : 4 },
      { name: "Canned Green Beans(baked/black)", quantity: formResponse.household_members <= 3 ? 2 : 4 },
      { name: "Assorted Fruit 1", quantity: formResponse.household_members <= 3 ? 4 : 8 },
      { name: "Assorted Fruit 2", quantity: formResponse.household_members <= 3 ? 4 : 8 },
      { name: "Vegetable Assortment", quantity: formResponse.household_members <= 3 ? 4 : 8 }
    ],
    "General Hygiene": [
      { name: "Deodorant", quantity: formResponse.household_members},
      { name: "Body Soap", quantity: formResponse.household_members},
      { name: "Toilet Paper(Rolls)", quantity: formResponse.household_members},
      { name: "Toothbrush" , quantity: formResponse.household_members },
      { name: "Toothpaste" , quantity: formResponse.household_members <= 3 ? 1 : 2 }
    ],
    "Cleaning Health Supplies" : [
      { name: "All Purpose Cleaner", quantity: 1},
      { name: "Cleaning Wipes(Packs)", quantity:1},
      { name: "Hand Sanitizer", quantity: formResponse.household_members},
      { name: "Tylenol", quantity: formResponse.household_members},
      { name: "Paper Towel", quantity: formResponse.household_members <= 6 ? 1 : 2},
      { name: "Dish Washing Soap", quantity:1},
      { name: "Packs of Face Mask", quantity:1},
    ],
    "Feminine Hygiene": [
      { name: "Feminine Wipes", quantity: formResponse.feminine_health_care_id ? 15 : 0 },
      { name: "Regular Tampons", quantity: formResponse.feminine_health_care_id ? 15 : 0 },
      { name: "Super Tampons", quantity: formResponse.feminine_health_care_id ? 15 : 0 },
      { name: "Thin Pads", quantity: formResponse.feminine_health_care_id ? 15 : 0 },
      { name: "Regular Pads", quantity: formResponse.feminine_health_care_id ? 15 : 0 }
    ]
  });
};
export { BagLabels };