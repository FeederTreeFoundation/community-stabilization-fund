import type { NextPage } from 'next';
import { ItemChecklistByRecipient, BagLabels } from '../../src/modules/checklists';

const Checklists: NextPage = () => {
  return (
    <>
      <ItemChecklistByRecipient />
      <BagLabels />
    </>
  );
};

export default Checklists;