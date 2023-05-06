import React, { useEffect, useRef, useState } from 'react';

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
}

const FormResponsesTable: FC<FormResponsesTableProps> = ({
  formResponses = [],
}) => {
  const [filteredFormResponses, setFilteredFormResponses] = useState<
    FormResponse[]
  >([]);
  const [filterState, setFilterState] = useState<string[]>([]);

  const formResponsesRef = useRef(formResponses);

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
    const newFormResponses = formResponsesRef.current?.filter(
      (f: FormResponse) => !ids.includes(f.id)
    );
    formResponsesRef.current = newFormResponses;
    const newFormRespIds = newFormResponses.map((f) => f.id);
    setFilteredFormResponses((prevFormResponses) =>
      prevFormResponses.filter((f: FormResponse) =>
        newFormRespIds.includes(f.id)
      )
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

  const filteredRows = (filterState: string[]): FormResponse[] => {
    if (filterState.length === 0) {
      return formResponsesRef.current;
    } else if (
      filterState.includes('is_black') &&
      filterState.includes('live_in_southside_atlanta') &&
      filterState.includes('is_local')
    ) {
      return formResponsesRef.current.filter(
        (resp) =>
          resp.is_black && resp.live_in_southside_atlanta && resp.is_local
      );
    } else if (
      filterState.includes('is_black') &&
      filterState.includes('live_in_pittsburgh_atlanta') &&
      filterState.includes('is_local')
    ) {
      return formResponsesRef.current.filter(
        (resp) =>
          resp.is_black && resp.live_in_pittsburgh_atlanta && resp.is_local
      );
    } else if (
      filterState.includes('is_local') &&
      filterState.includes('live_in_southside_atlanta')
    ) {
      return formResponsesRef.current.filter(
        (resp) => resp.is_local && resp.live_in_southside_atlanta
      );
    } else if (
      filterState.includes('is_local') &&
      filterState.includes('live_in_pittsburgh_atlanta')
    ) {
      return formResponsesRef.current.filter(
        (resp) => resp.is_local && resp.live_in_southside_atlanta
      );
    } else if (
      filterState.includes('is_black') &&
      filterState.includes('is_local')
    ) {
      return formResponsesRef.current.filter(
        (resp) => resp.is_black && resp.is_local
      );
    } else if (
      filterState.includes('is_black') &&
      filterState.includes('live_in_southside_atlanta')
    ) {
      return formResponsesRef.current.filter(
        (resp) => resp.is_black && resp.live_in_southside_atlanta
      );
    } else if (
      filterState.includes('is_black') &&
      filterState.includes('live_in_pittsburgh_atlanta')
    ) {
      return formResponsesRef.current.filter(
        (resp) => resp.is_black && resp.live_in_pittsburgh_atlanta
      );
    } else if (
      filterState.includes('live_in_pittsburgh_atlanta') &&
      filterState.includes('live_in_southside_atlanta')
    ) {
      return formResponsesRef.current.filter(
        (resp) =>
          resp.live_in_pittsburgh_atlanta && resp.live_in_southside_atlanta
      );
    } else if (filterState.includes('live_in_pittsburgh_atlanta')) {
      return formResponsesRef.current.filter(
        (resp) => resp.live_in_pittsburgh_atlanta
      );
    } else if (filterState.includes('live_in_southside_atlanta')) {
      return formResponsesRef.current.filter(
        (resp) => resp.live_in_southside_atlanta
      );
    } else if (filterState.includes('is_black')) {
      return formResponsesRef.current.filter((resp) => resp.is_black);
    } else if (filterState.includes('is_local')) {
      return formResponsesRef.current.filter((resp) => resp.is_local);
    } else {
      return formResponsesRef.current;
    }
  };

  useEffect(() => {
    setFilteredFormResponses(filteredRows(filterState));
  }, [filterState]);

  useEffect(() => {
    formResponsesRef.current = formResponses;
    setFilteredFormResponses(formResponses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formResponses?.length]);

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
