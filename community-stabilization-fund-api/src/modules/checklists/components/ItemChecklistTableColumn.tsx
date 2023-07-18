import { UnorderedList, ListItem } from 'carbon-components-react';

import styles from '../styles/checklists.module.css';

export interface ItemChecklistTableColumnProps {
  items: string[];
  thead: string;
}

const DymoOpOneChecklistTableColumn = ({
  items,
}: ItemChecklistTableColumnProps) => (
  <div className={styles.dymo_op_one_table_info}>
    <UnorderedList className={styles.dymo_op_one_table_info__ul} nested>
      {items.map((item, id) => (
        <div key={item + id}>• {item}</div>
      ))}
    </UnorderedList>
  </div>
);

const ItemChecklistTableColumn = ({
  items,
  thead,
}: ItemChecklistTableColumnProps) => (
  <div className={styles.table_info}>
    <div>{thead}</div>
    <UnorderedList className={styles.table_info__ul} nested>
      {items.map((item, id) => (
        <ListItem key={item + id}>{item}</ListItem>
      ))}
    </UnorderedList>
  </div>
);

// const DymoOpOneChecklistTableColumn = ({
//   items,
// }: ItemChecklistTableColumnProps) => (
//   <div className={styles.dymo_op_one_table_info}>
//     <UnorderedList className={styles.dymo_op_one_table_info__ul}>
//       {items.map((item, id) => (
//         <div key={item + id}>• {item}</div>
//       ))}
//     </UnorderedList>
//   </div>
// );

export { ItemChecklistTableColumn, DymoOpOneChecklistTableColumn };
