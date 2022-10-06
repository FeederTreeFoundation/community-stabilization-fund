import React from "react";
import { ItemChecklistTableColumn } from "./ItemChecklistTableColumn";

import styles from '../styles/checklists.module.css';

//TODO: Move to interface/type folder
export interface FormResponse {
id: string;
first_name: string;
last_name: string;
email: string;
phone_number: string;
phone_type: string;
address_id: string;
is_black: boolean;
is_local: boolean;
has_flu_symptoms: boolean;
household_members: number;
feminine_health_care_id: string;
item_requests: string;
additional_information: string;
is_pick_up: boolean;
is_volunteering: boolean;
is_subscribing: boolean;
_is_interested_in_membership: boolean;
}

// TODO: Convert this to a 4x2.5 set of labels printed horizontally
export interface ItemChecklistByRecipientAndBagProps {
  id?: number
}

const ItemChecklistByRecipientAndBag = ({id = 1}: ItemChecklistByRecipientAndBagProps) => {
  const thead = `Grocery Items Bag ${id}`;
  return (
    <div id="item-checklist" className={styles.item_checklist_wrapper}>
      <ItemChecklistTableColumn thead={thead} items={["Unordered list level 2", "Unordered list level 2"]}/>
    </div>
  );
};

export { ItemChecklistByRecipientAndBag };