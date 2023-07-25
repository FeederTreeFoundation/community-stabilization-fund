import { UnorderedList } from 'carbon-components-react';

import styles from './../../styles/DymoBag.module.css';

export interface ItemChecklistTableColumnProps {
  items: string[];
  thead: string;
}

const DymoChecklistTableColumn = ({ items }: ItemChecklistTableColumnProps) => (
  <div className={styles.dymo_op_one_table_info}>
    <UnorderedList className={styles.dymo_op_one_table_info__ul}>
      {items.map((item, id) => (
        <div key={item + id}>• {item}</div>
      ))}
    </UnorderedList>
  </div>
);

export default DymoChecklistTableColumn;
