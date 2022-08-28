import React from "react";
import styles from './styles/ItemChecklistByRecipientAndBag.module.css';

// Form Responses As Prop Arguments
const userInfoFields = ["Name", "Phone Number", "Address", "Distribution Method", "COVID concern"]
const conditionalPunctuation = (text: string) => text === "COVID concern" ? "?" : ":";
const getUserInfoParagraph = (text: string) => {
	return <p className={styles.user_info__p}>{text}{conditionalPunctuation(text)}</p>
};

const ItemChecklistByRecipientAndBag = () => {
	return (
		<div id="item-checklist" className={styles.item_checklist_wrapper}>
			<div className={styles.user_info}>
				{userInfoFields.map(field => getUserInfoParagraph(field))}
			</div>

			<div className={styles.table_info}>
				<div className={styles.table_info__thead}>Grocery Items Bag</div>
					<ul >
						<li></li>
						<li></li>
						<li></li>
					</ul>
			</div>
		</div>
	);
};

export { ItemChecklistByRecipientAndBag };