import { useState, useEffect } from 'react';

import type { FormResponse } from '../../src/db';
import type { NextPage } from 'next';

import {
  ItemChecklistByRecipient,
  ItemChecklistByBag,
} from '../../src/modules/checklists';

import FormResponseService from '../../src/services/form-response';

const ChecklistsPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getResponses = async () => {
      const res = await FormResponseService.getAllFormResponses();
      const { error } = res.data as any;

      if (error) {
        setError(error);
      } else {
        setFormResponses(res.data);
      }
    };
    getResponses();
  }, []);

  if(error || formResponses.length === 0) return <>{error?.message ?? 'Unknown error'}</>;

  return (
    <>
      {formResponses.map((formResponse) => (
        <>
          <ItemChecklistByRecipient formResponse={formResponse} />
          <ItemChecklistByBag formResponse={formResponse} />
        </>
      ))}
    </>
  );
};

export default ChecklistsPage;
