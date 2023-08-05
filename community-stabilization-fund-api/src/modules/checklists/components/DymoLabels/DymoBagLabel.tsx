import Image from 'next/image';

import { BAG_LABEL_TYPES } from '../../constants';
import { ItemChecklistTableColumn } from '../ItemChecklist';

import styles from './../../styles/DymoBag.module.css';

interface BagLabelProps {
  thead: string;
  items: string[];
  recipientInfoList: JSX.Element[];
}

const DymoBagLabel = ({thead, items, recipientInfoList}: BagLabelProps) => (
  <div className={styles.dymo_op_one_bag_label}>
    <div className={styles.dymo_op_one_bag_label_info}>{recipientInfoList}</div>
    <ItemChecklistTableColumn 
      thead={thead} 
      items={items ?? []} 
      bagLabelType={BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE}
    />
    <div className={styles.dymo_img_wrapper}>
      <Image
        src='/img/cmb_bag_label_logo.png'
        className={styles.dymo_bag_label__img}
        alt='CMB Logo'
        width={250}
        height={250}
        objectFit='contain'
        // Set priority to true, so loads for the print preview
        priority={true}
      />
    </div>
  </div>
);

export {DymoBagLabel};
