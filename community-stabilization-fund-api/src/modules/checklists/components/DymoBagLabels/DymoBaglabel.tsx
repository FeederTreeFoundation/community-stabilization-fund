import Image from 'next/image';

import DymoChecklistTableColumn from './DymoChecklistTableColumn';

import styles from './../../styles/DymoBag.module.css';

interface BagLabelProps {
  thead: string;
  items: string[];
  recipientInfoList: JSX.Element[];
}

const DymoBagLabel = ({thead, items, recipientInfoList}: BagLabelProps) => (
  <div className={styles.dymo_op_one_bag_label}>
    <div className={styles.dymo_op_one_bag_label_info}>{recipientInfoList}</div>
    <DymoChecklistTableColumn thead={thead} items={items ?? []} />
    <div className={styles.dymo_img_wrapper}>
      <Image
        src='/img/cmb_bag_label_logo.png'
        className={styles.dymo_bag_label__img}
        alt='CMB Logo'
        width={250}
        height={250}
        objectFit='contain'
      />
    </div>
  </div>
);

export default DymoBagLabel;
