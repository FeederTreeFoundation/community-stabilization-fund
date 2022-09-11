import type { NextPage } from 'next';
import { GroceryItemsTable, ItemChecklistByRecipientAndBag } from '../../src/modules/checklists';

const Checklists: NextPage = () => {
  return (
    <>
      <GroceryItemsTable />
      <ItemChecklistByRecipientAndBag />
    </>
  );
};

export default Checklists;