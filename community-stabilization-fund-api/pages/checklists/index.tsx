import { ItemChecklistByRecipient, ItemChecklistByBag } from '../../src/modules/checklists';

import type { NextPage } from 'next';

const Checklists: NextPage = () => (
  <>
    <ItemChecklistByRecipient />
    <ItemChecklistByBag />
  </>
);

export default Checklists;