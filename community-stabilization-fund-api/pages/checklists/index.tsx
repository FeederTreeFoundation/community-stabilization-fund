import { useState, useEffect } from 'react';

import {
  ItemChecklistByRecipient,
  ItemChecklistByBag,
} from '../../src/modules/checklists';

import FormResponseServices from '../../src/services/form-response';

import type { FormResponse } from '../../src/db';

import type { NextPage } from 'next';

const ChecklistsPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  useEffect(() => {
    const getResponses = async () => {
      const res = await FormResponseServices.getAllFormResponses();
      setFormResponses(res.data);
    };
    getResponses();
  }, []);
  return (
    <>
      {formResponses &&
        formResponses.map((formResponse) => (
          <>
            <ItemChecklistByRecipient formResponse={formResponse} />
            <ItemChecklistByBag />
          </>
        ))}
    </>
  );
};

export default ChecklistsPage;
