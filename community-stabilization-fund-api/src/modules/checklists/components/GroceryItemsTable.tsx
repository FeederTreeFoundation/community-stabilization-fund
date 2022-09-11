import { formResponseMock, groceryItemsMock } from "../../../mocks";
import { ItemChecklistTableColumn } from "./ItemChecklistTableColumn";

import styles from '../styles/checklists.module.css';

const formResponseValues = [
  `${formResponseMock.first_name + ' ' + formResponseMock.last_name}`,
  formResponseMock.phone_number,
  formResponseMock.address_id,
  formResponseMock.is_pick_up ? "Yes" : "No",
  formResponseMock.has_flu_symptoms ? "Yes" : "No",
  formResponseMock.household_members
];

export interface GroceryItemProps {
    groceryItems?: { 
      [thead: string]: {
        name: string;
        quantity: number;
      }[]
    };
    userInfoValues?: any[];
}

const GroceryItemsTable = ({
  groceryItems = groceryItemsMock, 
  userInfoValues = formResponseValues
}: GroceryItemProps) => {
  const userInfoFields = [ 
    "Name", "Phone Number", "Address", "Distribution Method", "COVID concern", "# in Household"
  ];
  const conditionalPunctuation = (text: string) => text === "COVID concern" ? "?" : ":";
  const getUserInfoParagraph = (text: string, id: number) => {
    return (
      <p key={text+id} className={styles.user_info__p}>
        {text}{conditionalPunctuation(text)}{" "}{userInfoValues[id]} 
      </p>
    );
  };

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