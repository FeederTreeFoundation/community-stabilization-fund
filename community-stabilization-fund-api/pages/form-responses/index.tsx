import { useEffect, useState } from 'react';

import type { FormResponse } from '../../src/db/models';
import type { NextPage } from 'next';

import { FormResponsesTable } from '../../src/modules/form-responses';
import FormResponseService from '../../src/services/form-response';

const FormResponsesPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getResponses = async () => {
      try {
        const res = await FormResponseService.getAllFormResponses();
        setFormResponses(res.data);
      } catch (e) {
        setError(e as Error)
      }
    };
    getResponses();
  }, []);

  if(error) return <html>{error.message}</html>

  return <FormResponsesTable formResponses={formResponses} />;
};

export default FormResponsesPage;
