import { useEffect, useState } from 'react';

import { FormResponsesTable } from '../../src/modules/form-responses';
import FormResponseService from '../../src/services/form-response';

import type { FormResponse } from '../../src/db/models';
import type { NextPage } from 'next';
const FormResponsesPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  const [filteredFormResponses, setFilteredFormResponses] = useState<
    FormResponse[]
  >([]);
  const [filterState, setFilterState] = useState<string[]>([]);

  useEffect(() => {
    const getResponses = async () => {
      const res = await FormResponseService.getAllFormResponses();
      setFormResponses(res.data);
      setFilteredFormResponses(res.data);
    };
    getResponses();
  }, []);

  useEffect(() => {
    console.log(filterState);
    if (filterState.length === 0) {
      setFilteredFormResponses(formResponses);
    }
    if (filterState.includes('is_black') && filterState.includes('is_local')) {
      const filtered = formResponses.filter(
        (resp) => resp.is_black && resp.is_local
      );
      setFilteredFormResponses(filtered);
    } else if (filterState.includes('is_black')) {
      const filtered = formResponses.filter((resp) => resp.is_black);
      setFilteredFormResponses(filtered);
    } else if (filterState.includes('is_local')) {
      const filtered = formResponses.filter((resp) => resp.is_local);
      setFilteredFormResponses(filtered);
    } else {
      setFilteredFormResponses(formResponses);
    }
  }, [filterState, formResponses]);

  const handleDelete = (rows: FormResponse[]) => {
    const ids = rows.map((row) => row.id);
    FormResponseService.deleteOneFormResponse(ids);
    setFormResponses(
      formResponses.filter((formResponse) => !ids.includes(formResponse.id))
    );
  };

  const handleFilter = (value: string) => {
    if (filterState.includes(value)) {
      // remove previous state
      const removedFilterState = filterState.filter((state) => state !== value);
      setFilterState(removedFilterState);
    } else {
      setFilterState([...filterState, value]);
    }
  };
  return (
    <FormResponsesTable
      handleDelete={handleDelete}
      formResponses={filteredFormResponses}
      handleFilter={handleFilter}
    />
  );
};

export default FormResponsesPage;
