import { UnorderedList, ListItem } from 'carbon-components-react';

import styles from '../styles/checklists.module.css';

export interface ItemChecklistTableColumnProps {
  items: string[];
  thead: string;
}

const ItemChecklistTableColumn = ({
  items,
  thead,
}: ItemChecklistTableColumnProps) => (
  <div className={styles.table_info}>
    <div className={styles.table_info__thead}>{thead}</div>
    <UnorderedList className={styles.table_info__ul} nested>
      {items.map((item, id) => (
        <ListItem key={item + id}>{item}</ListItem>
      ))}
    </UnorderedList>
  </div>
);

export { ItemChecklistTableColumn };
