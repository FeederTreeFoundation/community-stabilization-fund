import type { NextPage } from 'next';
import { ItemChecklistByRecipient, ItemChecklistByRecipientAndBag } from '../../src/modules/checklists';

const Checklists: NextPage = () => {
  return (
    <>
      <ItemChecklistByRecipient />
      <ItemChecklistByRecipientAndBag />
    </>
  );
};

export default Checklists;