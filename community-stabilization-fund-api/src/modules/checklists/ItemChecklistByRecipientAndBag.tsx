import { ListItem, UnorderedList } from "carbon-components-react";
import React from "react";
import styles from './styles/ItemChecklistByRecipientAndBag.module.css';

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
_is_interested_in_memberbership: boolean;
}

const userInfoFields = [ "Name", "Phone Number", "Address", "Distribution Method", "COVID concern"]
const conditionalPunctuation = (text: string) => text === "COVID concern" ? "?" : ":";
const getUserInfoParagraph = (text: string, formResponse?: FormResponse) => {
	return (
	  <>
		<p className={styles.user_info__p}>
			{text}{conditionalPunctuation(text)}
		</p>
		{/* We'll add this later to display form responses */}
		{/* {formResponse && <p>{formResponse[text]}</p>} */}
	  </>
	)
};

// Form Responses As Prop Arguments
// i.e. const ItemChecklistByRecipientAndBag = (props: FormResponse) => {
const ItemChecklistByRecipientAndBag = () => {
	return (
		<div id="item-checklist" className={styles.item_checklist_wrapper}>
			<div className={styles.user_info}>
				{userInfoFields.map(field => getUserInfoParagraph(field))}
			</div>

			<div className={styles.table_info}>
				<div className={styles.table_info__thead}>Grocery Items Bag {/* Number of bags*/}</div>
				{/* Turn this into iterable list based off form responses */}
				<UnorderedList nested>
					<ListItem>
						Ordered list level 2
					</ListItem>
					<ListItem>
						Ordered list level 2
					</ListItem>
					<ListItem>
						Ordered list level 2
					</ListItem>
				</UnorderedList>
			</div>
		</div>
	);
};

export { ItemChecklistByRecipientAndBag };