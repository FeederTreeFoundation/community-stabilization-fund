import Image from 'next/image';

import {
  ItemChecklistTableColumn,
  DymoOpOneChecklistTableColumn,
} from './ItemChecklistTableColumn';

import styles from '../styles/checklists.module.css';

interface BagLabelProps {
  thead: string;
  items: string[];
  recipientInfoList: JSX.Element[];
}

const DymoBagOpOneLabel = ({
  thead,
  items,
  recipientInfoList,
}: BagLabelProps) => (
  <div className={styles.dymo_op_one_bag_label}>
    <div className={styles.dymo_op_one_bag_label_info}>{recipientInfoList}</div>
    <DymoOpOneChecklistTableColumn thead={thead} items={items ?? []} />
    <div className={styles.dymo_img_wrapper}>
      <Image
        src='/img/cmb_bag_label_logo.png'
        alt='CMB Logo'
        width={250}
        height={250}
        objectFit='contain'
      />
    </div>
  </div>
);

const BagLabel = ({ thead, items, recipientInfoList }: BagLabelProps) => (
  <div className={styles.bag_label}>
    <div className={styles.user_bag_label_info}>{recipientInfoList}</div>
    <ItemChecklistTableColumn thead={thead} items={items ?? []} />
  </div>
);

export { BagLabel, DymoBagOpOneLabel };
