import type { NextPage } from 'next';
import { ItemChecklistByRecipient, ItemChecklistByBag } from '../../src/modules/checklists';

const Checklists: NextPage = () => {
  return (
    <>
      <ItemChecklistByRecipient />
      <ItemChecklistByBag />
    </>
  );
};

export default Checklists;