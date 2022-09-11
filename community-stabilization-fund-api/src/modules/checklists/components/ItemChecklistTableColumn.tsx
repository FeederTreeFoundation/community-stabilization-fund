import { UnorderedList, ListItem } from "carbon-components-react";

import styles from '../styles/checklists.module.css';

export interface ItemChecklistTableColumnProps {
    items: string[], 
    isFirstIndex?: boolean;
    children?: JSX.Element|JSX.Element[];
};

const ItemChecklistTableColumn = ({items, isFirstIndex = true, children}: ItemChecklistTableColumnProps) => (
  <div className={styles.table_info} style={!isFirstIndex ? {borderLeft: "medium none"} : {}}>
    {children as JSX.Element}
    <UnorderedList nested>
      {items.map((item, id) => <ListItem key={item + id}>{item}</ListItem>)}
    </UnorderedList>
  </div>
);

export { ItemChecklistTableColumn };