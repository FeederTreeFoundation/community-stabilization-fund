import { BagLabel, DymoBagOpOneLabel } from './BagLabel';

const BagList = (
  slicePositions: number[][],
  recipientInfoList: JSX.Element[],
  thead: string,
  items: string[],
  labelCount: number
) =>
  slicePositions.map((pos, id) => (
    <BagLabel
      key={id}
      recipientInfoList={recipientInfoList}
      thead={thead + ` ${++labelCount}`}
      items={items.slice(pos[0], pos[1])}
    />
  ));

const DymoBagOpOneList = (
  slicePositions: number[][],
  recipientInfoList: JSX.Element[],
  thead: string,
  items: string[],
  labelCount: number
) =>
  slicePositions.map((pos, id) => (
    <DymoBagOpOneLabel
      key={id}
      recipientInfoList={recipientInfoList}
      thead={thead + ` ${++labelCount}`}
      items={items.slice(pos[0], pos[1])}
    />
  ));
export { BagList, DymoBagOpOneList };
