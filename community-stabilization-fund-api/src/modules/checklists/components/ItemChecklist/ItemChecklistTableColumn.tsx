import {UnorderedList, ListItem} from 'carbon-components-react';

import { BAG_LABEL_TYPES } from '../../constants';

import styles from '../../styles/ItemChecklistTableColumn.module.css';

interface ItemChecklistTableColumnProps {
  items: string[];
  thead: string;
  bagLabelType?: string;
}

const ItemChecklistTableColumn = ({
  items,
  thead,
  bagLabelType = '',
}: ItemChecklistTableColumnProps) => {
  if(bagLabelType === BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE) {
    return (
      <div className={styles.dymo_op_one_table_info}>
        <UnorderedList className={styles.dymo_op_one_table_info__ul}>
          {items.map((item, id) => (
            <div key={item + id} className={styles.dymo_list_item}>
              • {item}
            </div>
          ))}
        </UnorderedList>
      </div>
    )
  }

  return (
    <div className={styles.table_info}>
      <div className={styles.table_info__thead}>{thead}</div>
      <UnorderedList className={styles.table_info__ul} nested>
        {items.map((item, id) => (
          <ListItem key={item + id}>{item}</ListItem>
        ))}
      </UnorderedList>
    </div>
  )
};

export {ItemChecklistTableColumn};
