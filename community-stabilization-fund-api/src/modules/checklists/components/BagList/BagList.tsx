import { BAG_LABEL_TYPES } from '../../constants';

import { DymoBagLabel } from '../DymoLabels';
import {BagLabel} from '../SheetLabels/BagLabel';


const BagList = (
  slicePositions: number[][],
  recipientInfoList: JSX.Element[],
  thead: string,
  items: string[],
  labelCount: number,
  bagLabelType?: string,
) => {
  if(bagLabelType === BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE) {
    return slicePositions.map((pos, id) => (
      <DymoBagLabel
        key={id}
        recipientInfoList={recipientInfoList}
        thead={thead + ` ${++labelCount}`}
        items={items.slice(pos[0], pos[1])}
      />
    ));}

  return slicePositions.map((pos, id) => (
    <BagLabel
      key={id}
      recipientInfoList={recipientInfoList}
      thead={thead + ` ${++labelCount}`}
      items={items.slice(pos[0], pos[1])}
    />
  ));
};

export {BagList};
