import { mockData as formResponseMock } from "../../form-responses";
import { ItemChecklistTableColumn } from "./ItemChecklistTableColumn";

import styles from '../styles/checklists.module.css';

export const formResponsesValues = [
  `${formResponseMock.first_name + ' ' + formResponseMock.last_name}`,
  formResponseMock.phone_number,
  formResponseMock.address_id,
  formResponseMock.is_pick_up ? "Yes" : "No",
  formResponseMock.has_flu_symptoms ? "Yes" : "No",
  formResponseMock.household_members
];

const userInfoFields = [ 
  "Name", "Phone Number", "Address", "Distribution Method", "COVID concern", "# in Household"
];
const conditionalPunctuation = (text: string) => text === "COVID concern" ? "?" : ":";
const userInfoValues = formResponsesValues;
const getUserInfoParagraph = (text: string, id: number) => {
  return (
    <p key={text+id} className={styles.user_info__p}>
      {text}{conditionalPunctuation(text)}{" "}{userInfoValues[id]} 
    </p>
  );
};


export const groceryItemsMock = {
  "Groceries": [
    { name: "Chicken", quantity: 1 },
    { name: "Eggs", quantity: 2 },
    { name: "Bread", quantity: 2 }
  ],
  "General Hygiene": [
    { name: "Deodorant", quantity: 2 },
    { name: "Body Soap", quantity: 2 },
    { name: "Toilet Paper", quantity: 2 },
    { name: "Toothbrush" , quantity: 2 },
    { name: "Toothpaste" , quantity: 1 }
  ]
};


export interface GroceryItemProps {
    groceryItems?: { 
      [thead: string]: {
        name: string;
        quantity: number;
      }[]
    };
}

const GroceryItemsTable = ({groceryItems = groceryItemsMock}: GroceryItemProps) => {
  // Pass grocreryItems from props instead
  return (
    <div id="item-checklist-table" className={styles.item_checklist_wrapper}>
      <>
        <div className={styles.user_info}>
          {userInfoFields.map((field, id) => getUserInfoParagraph(field, id))}
        </div>

        <div className={styles.item_checklist_row}>
          {Object.keys(groceryItems).map(key => {
            const thead = <div className={styles.table_info__thead}>{key}</div>;
            const items = groceryItems[key].map(item => `${item.name} (x${item.quantity})`);
            return (
              <ItemChecklistTableColumn key={key} items={items}>
                {thead}
              </ItemChecklistTableColumn>
            );
          })}
        </div>
      </>
    </div>
  );
};

export { GroceryItemsTable };