import { UnorderedList, ListItem } from "carbon-components-react";

import styles from '../styles/checklists.module.css';

export interface ItemChecklistTableColumnProps {
    items: string[], 
    children?: JSX.Element|JSX.Element[];
};

const ItemChecklistTableColumn = ({items, children}: ItemChecklistTableColumnProps) => (
  <div className={styles.table_info}>
    {children as JSX.Element}
    {/* Turn this into iterable list based off form responses */}
    <UnorderedList nested>
      {items.map((item, id) => <ListItem key={item + id}>{item}</ListItem>)}
    </UnorderedList>
  </div>
);

export { ItemChecklistTableColumn };