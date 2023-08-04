import {ItemChecklistTableColumn} from './ItemChecklistTableColumn';

import styles from '../styles/checklists.module.css';

interface BagLabelProps {
  thead: string;
  items: string[];
  recipientInfoList: JSX.Element[];
}

const BagLabel = ({thead, items, recipientInfoList}: BagLabelProps) => (
  <div className={styles.bag_label}>
    <div className={styles.user_bag_label_info}>{recipientInfoList}</div>
    <ItemChecklistTableColumn thead={thead} items={items ?? []} />
  </div>
);

export {BagLabel};
