import { formResponseMock, groceryItemsMock } from "../../../mocks";
import { omit } from "../../../utils";

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

export interface ItemChecklistByRecipientProps {
    groceryItems?: { 
      [thead: string]: {
        name: string;
        quantity: number;
      }[]
    };
    recipientInfo?: any[];
}

const ItemChecklistByRecipient = ({
  groceryItems = groceryItemsMock, 
  recipientInfo = formResponseValues
}: ItemChecklistByRecipientProps) => {
  const recipientInfoFields = [ 
    "Name", "Phone Number", "Address", "Distribution Method", "COVID concern", "# in Household"
  ];
  const conditionalPunctuation = (text: string) => text === "COVID concern" ? "?" : ":";
  const getRecipientInfoParagraph = (text: string, id: number) => {
    return (
      <p key={text+id} className={styles.user_info__p}>
        {text}{conditionalPunctuation(text)}{" "}{recipientInfo[id]} 
      </p>
    );
  };
  // Only display Feminine Hygiene items if the recipient has them, otherwise guard against the field being passed
  const filteredGroceryItems = formResponseMock.feminine_health_care_id 
    ? groceryItems 
    : omit("Feminine Hygiene", groceryItems);

  return (
    <div id="item-checklist-table" className={styles.item_checklist_wrapper}>
      <>
        <div className={styles.user_info}>
          {recipientInfoFields.map((field, id) => getRecipientInfoParagraph(field, id))}
        </div>

        <div className={styles.item_checklist_row}>
          {Object.keys(groceryItems).map((key, id) => {
            const thead = <div className={styles.table_info__thead}>{key}</div>;
            const items = groceryItems[key].map(item => `${item.name} (x${item.quantity})`);
            return (
              <ItemChecklistTableColumn key={key} items={items} isFirstIndex={id === 0}>
                {thead}
              </ItemChecklistTableColumn>
            );
          })}
        </div>
      </>
    </div>
  );
};

export { ItemChecklistByRecipient };