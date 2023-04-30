import { useEffect, useState } from 'react';

import { FormResponsesTable } from '../../src/modules/form-responses';
import FormResponseService from '../../src/services/form-response';

import type { FormResponse } from '../../src/db/models';
import type { NextPage } from 'next';
const FormResponsesPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  useEffect(() => {
    const getResponses = async () => {
      const res = await FormResponseService.getAllFormResponses();
      setFormResponses(res.data);
    };
    getResponses();
  }, []);
  const handleDelete = (rows: FormResponse[]) => {
    const ids = rows.map((row) => row.id);
    FormResponseService.deleteFormResponse(ids);
    setFormResponses(
      formResponses.filter((formResponse) => !ids.includes(formResponse.id))
    );
  };
  return (
    <FormResponsesTable
      handleDelete={handleDelete}
      formResponses={formResponses}
    />
  );
};

export default FormResponsesPage;
