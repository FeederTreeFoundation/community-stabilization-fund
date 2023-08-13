import { useEffect, useState } from 'react';

import type { FormResponseDTO } from '../../src/db/models';
import type { NextPage } from 'next';

import { FormResponsesTable } from '../../src/modules/form-responses';
import FormResponseService from '../../src/services/form-response';

const FormResponsesPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponseDTO[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const getResponses = async () => {
      try {
        const res = await FormResponseService.getAll();
        setFormResponses(res.data);
      } catch (e) {
        setError(e as Error);
      }
    };
    getResponses();
  }, []);

  if(error) return <html>{error.message}</html>;

  return <FormResponsesTable formResponses={formResponses} />;
};

export default FormResponsesPage;
