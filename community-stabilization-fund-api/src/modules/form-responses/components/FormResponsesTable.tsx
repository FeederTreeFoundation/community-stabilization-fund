import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';

import type {FormResponseDTO } from '../../../db';
import type {
  DataTableHeader,
  DataTableRow,
} from 'carbon-components-react/lib/components/DataTable';

import {FilterToolbarActions} from './FilterToolbarActions';

import {BasicTable} from '../../../components';
import FormResponseService from '../../../services/form-response';
import { FormQuestionsContext } from '../../forms';
import {FORM_RESPONSE_QUESTIONS} from '../constants';

import {getAddress, mapBooleanToResponse} from '../utils';

import styles from '../styles/form-responses.module.css';

interface FormResponsesTableProps {
  formResponses?: FormResponseDTO[];
}

const FormResponsesTable = ({
  formResponses = [],
}: FormResponsesTableProps) => {
  const [filteredFormResponses, setFilteredFormResponses] = useState<
    FormResponseDTO[]
  >([]);
  const [filterState, setFilterState] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');
  const formResponsesRef = useRef(formResponses);

  const { questions } = useContext(FormQuestionsContext);

  const handleFilter = (value: string) => {
    setFilterValue(value);
    if (filterState.includes(value)) {
      // remove previous state
      const removedFilterState = filterState.filter((state) => state !== value);
      setFilterState(removedFilterState);
    } else {
      setFilterState([...filterState, value]);
    }
  };

  const handleArchive = (rows: FormResponseDTO[]) => {
    const ids = rows.map((row) => `${row.id}`);
    const body = {
      archived: true,
      archived_on: new Date(),
    };
    FormResponseService.update(ids, body);
    const newFormResponses = formResponsesRef.current?.filter(
      (f: FormResponseDTO) => !ids.includes(`${f.id}`)
    );
    formResponsesRef.current = newFormResponses;
    const newFormRespIds = newFormResponses.map((f) => f.id);
    setFilteredFormResponses((prevFormResponses) =>
      prevFormResponses.filter((f: FormResponseDTO) =>
        newFormRespIds.includes(f.id)
      )
    );
  };

  const rows = createRows(filteredFormResponses) as DataTableRow<string>[];
  const headers = createHeaders(FORM_RESPONSE_QUESTIONS) as DataTableHeader<string>[];

  const getFilteredRows = useCallback(
    (filterState: string[]): FormResponseDTO[] => {
      if (filterState.length === 0) {
        return formResponsesRef.current;
      } else {
        if (filterValue !== 'is_black') {
          return formResponsesRef.current.filter((f) =>
            filterState.every((key) => f[key as keyof FormResponseDTO] == true)
          );
        } else {
          return formResponsesRef.current.filter((f) =>
            filterState.every((key) => f[key as keyof FormResponseDTO] == false)
          );
        }
      }
    },
    [filterValue]
  );

  useEffect(() => {
    const filteredRows = getFilteredRows(filterState);
    setFilteredFormResponses(filteredRows);
  }, [filterState, filterState.length, getFilteredRows]);

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
        handleArchive={handleArchive}
        toolbarActions={toolbarActions}
        rows={rows}
        headers={headers}
      />
    </div>
  );

  function createHeaders(formResponseQuestions: string[]) {
    const customHeaders = questions.map((question) => ({
      key: `question_${question.id}`,
      header: question.text,
    }));

    const defaultHeaders = formResponseQuestions.map((header: string) => ({
      key: header.toLowerCase().replaceAll(' ', '_'),
      header,
    }));

    return [...defaultHeaders, ...customHeaders];
  }

  function createRows(formResponses: FormResponseDTO[]) {
    const rows = formResponses.map((resp) => {
      const feminine_health_care = !!resp.feminine_health_care;
      const address = getAddress(resp);
      
      const customFieldsMap = resp.answers?.reduce((acc: any, curr: any) => {
        acc[`question_${curr.question_id}`] = curr.text;
        return acc;
      }, {});

      const r = {
        ...resp,
        ...customFieldsMap,
        feminine_health_care,
        address,
        id: `${resp.id}`
      };

      FORM_RESPONSE_QUESTIONS.forEach((q) => mapBooleanToResponse(r, q));

      return r;
    });

    return rows;
  }
};

export { FormResponsesTable };
