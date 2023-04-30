import React, { useEffect, useState } from 'react';

import formResponses from '../../../../pages/form-responses';

import { BasicTable } from '../../../components';
import FormResponseService from '../../../services/form-response';
import { FORM_RESPONSE_QUESTIONS } from '../constants';

import { getAddress, mapBooleanToResponse } from '../utils';
import { FilterToolbarActions } from './FilterToolbarActions';

import type { FormResponse } from '../../../db';

import type {
  DataTableHeader,
  DataTableRow,
} from 'carbon-components-react/lib/components/DataTable';

import type { FC } from 'react';

import styles from '../styles/form-responses.module.css';

interface FormResponsesTableProps {
  formResponses?: FormResponse[];
  handleDelete?: Function;
  setFormResponses: Function;
}

const FormResponsesTable: FC<FormResponsesTableProps> = ({
  formResponses = [],
  setFormResponses,
}) => {
  const [filteredFormResponses, setFilteredFormResponses] =
    useState<FormResponse[]>(formResponses);
  const [filterState, setFilterState] = useState<string[]>([]);

  const handleFilter = (value: string) => {
    if (filterState.includes(value)) {
      // remove previous state
      const removedFilterState = filterState.filter((state) => state !== value);
      setFilterState(removedFilterState);
    } else {
      setFilterState([...filterState, value]);
    }
  };

  const handleDelete = (rows: FormResponse[]) => {
    const ids = rows.map((row) => row.id);
    FormResponseService.deleteFormResponse(ids);
    setFormResponses(
      formResponses?.filter((formResponse) => !ids.includes(formResponse.id))
    );
  };

  const createHeaders = (formResponseQuestions: string[]) =>
    formResponseQuestions.map((header: string) => ({
      key: header.toLowerCase().replaceAll(' ', '_'),
      header,
    }));

  const createRows = (formResponses: FormResponse[]) =>
    formResponses.map((resp) => {
      const feminine_health_care = !!resp.feminine_health_care_id;
      const address = getAddress(resp);
      const r = { ...resp, feminine_health_care, address };

      FORM_RESPONSE_QUESTIONS.forEach((q) => mapBooleanToResponse(r, q));

      return r;
    });
  const rows = createRows(
    filteredFormResponses ?? []
  ) as DataTableRow<string>[];
  const headers = createHeaders(
    FORM_RESPONSE_QUESTIONS
  ) as DataTableHeader<string>[];

  useEffect(() => {
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

  const toolbarActions = (
    <FilterToolbarActions
      filterState={filterState}
      handleFilter={handleFilter}
    />
  );
  return (
    <div className={styles.form_responses_table}>
      <BasicTable
        handleDelete={handleDelete}
        toolbarActions={toolbarActions}
        rows={rows}
        headers={headers}
      />
    </div>
  );
};

export { FormResponsesTable };

export async function getStaticProps() {
  return {
    props: {
      formResponses: formResponses,
    },
  };
}
