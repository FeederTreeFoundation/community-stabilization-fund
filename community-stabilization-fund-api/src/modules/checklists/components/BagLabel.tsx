import { ItemChecklistTableColumn } from './ItemChecklistTableColumn';

import styles from '../styles/checklists.module.css';

const BagLabel = ({
  thead,
  items,
  recipientInfoList,
}: {
  thead: string;
  items: string[];
  recipientInfoList: JSX.Element[];
}) => (
  <div className={styles.bag_label}>
    {recipientInfoList}
    <ItemChecklistTableColumn thead={thead} items={items ?? []} />
  </div>
);

export default BagLabel;
