import {
  ItemChecklistByRecipient,
  ItemChecklistByBag,
} from '../../src/modules/checklists';

import type { NextPage } from 'next';

const ChecklistsPage: NextPage = () => (
  <>
    <ItemChecklistByRecipient />
    <ItemChecklistByBag />
  </>
);

export default ChecklistsPage;
