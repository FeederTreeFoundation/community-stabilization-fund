import { ItemChecklistTableColumn } from "./ItemChecklistTableColumn";

import type { BagItemsMap } from "../types";

interface BagLabelsProps {
    label: string;
     bagItemsMap: BagItemsMap;
     labelCount: number;
  }
  
const BagLabels = ({label, bagItemsMap, labelCount}: BagLabelsProps) => {
  const thead = `${label} Bag`;
  
  if(label === 'Groceries') {
    const bagItems = bagItemsMap[label].map(item => `${item.name} (x${item.quantity})`);
    return(
      <>
        <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(0,1)}/>
        <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(1,4)}/>
        <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(4,6)}/>
        <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(6)}/>
      </>
    );
  }
  
  if(label === 'General Hygiene') {
    const bagItems = bagItemsMap[label].map(item => `${item.name} (x${item.quantity})`);
    return(
      <>
        <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems}/>
      </>
    );
  }
  
  if(label === 'Cleaning/Health Supplies') {
    const bagItems = bagItemsMap[label].map(item => `${item.name} (x${item.quantity})`);
    return(
      <>
        <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(0, 4)}/>
        <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems.slice(4)}/>
      </>
    );
  }
  
  if(label === 'Feminine Hygiene') {
    const bagItems = bagItemsMap[label].map(item => `${item.name} (x${item.quantity})`);
    return(
      <>
        <ItemChecklistTableColumn thead={thead + ` ${++labelCount}`} items={bagItems}/>
      </>
    );
  }
  
  return <></>;
};

export { BagLabels };