import { useEffect, useState } from 'react';

import { FormResponsesTable } from '../../src/modules/form-responses';
import FormResponseServices from '../../src/services/form-response';

import type { FormResponse } from '../../src/db/models';
import type { NextPage } from 'next';
const FormResponsesPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  useEffect(() => {
    const getResponses = async () => {
      const res = await FormResponseServices.getAllFormResponses();
      setFormResponses(res.data);
    };
    getResponses();
  }, []);
  return <FormResponsesTable formResponses={formResponses} />;
};

export default FormResponsesPage;
