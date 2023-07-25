import DymoBagLabel from './DymoBaglabel';

const DymoBagList = (
  slicePositions: number[][],
  recipientInfoList: JSX.Element[],
  thead: string,
  items: string[],
  labelCount: number
) =>
  slicePositions.map((pos, id) => (
    <DymoBagLabel
      key={id}
      recipientInfoList={recipientInfoList}
      thead={thead + ` ${++labelCount}`}
      items={items.slice(pos[0], pos[1])}
    />
  ));

export default DymoBagList;
