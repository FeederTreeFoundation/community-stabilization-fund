import type { NextPage } from 'next';
import { ItemChecklistByRecipient, ItemChecklistByBag } from '../../src/modules/checklists';

const ChecklistsPage: NextPage = () => {
  return (
    <>
      <ItemChecklistByRecipient />
      <ItemChecklistByBag />
    </>
  );
};

export default ChecklistsPage;