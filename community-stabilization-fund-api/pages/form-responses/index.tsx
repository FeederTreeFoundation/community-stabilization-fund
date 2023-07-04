import { useEffect, useState } from 'react';

import type { FormResponse } from '../../src/db/models';
import type { NextPage } from 'next';

import { FormResponsesTable } from '../../src/modules/form-responses';
import FormResponseService from '../../src/services/form-response';

const FormResponsesPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  useEffect(() => {
    const getResponses = async () => {
      const res = await FormResponseService.getAllFormResponses();
      setFormResponses(res.data);
    };
    getResponses();
  }, []);

  return <FormResponsesTable formResponses={formResponses} />;
};

export default FormResponsesPage;
