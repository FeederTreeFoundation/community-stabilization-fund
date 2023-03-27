import { useState, useEffect } from 'react';

import {
  ItemChecklistByRecipient,
  ItemChecklistByBag,
} from '../../src/modules/checklists';

import FormResponseService from '../../src/services/form-response';

import type { FormResponse } from '../../src/db';

import type { NextPage } from 'next';

const ChecklistsPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  useEffect(() => {
    const getResponses = async () => {
      const res = await FormResponseService.getAllFormResponses();
      setFormResponses(res.data);
    };
    getResponses();
  }, []);

  return (
    <>
      {formResponses?.map((formResponse) => (
        <>
          <ItemChecklistByRecipient formResponse={formResponse} />
          <ItemChecklistByBag />
        </>
      ))}
    </>
  );
};

export default ChecklistsPage;
