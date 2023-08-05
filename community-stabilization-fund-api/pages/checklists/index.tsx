import { useState, useEffect, useContext } from 'react';

import type { FormResponse } from '../../src/db';
import type { NextPage } from 'next';

import {
  ItemChecklist,
  ChecklistsRulesContext,
} from '../../src/modules/checklists';
import FormResponseService from '../../src/services/form-response';

const ChecklistsPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  const [error, setError] = useState<Error>();
  const { bagLabelType } = useContext(ChecklistsRulesContext);

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

  if (error || formResponses.length === 0){
    return <>{error?.message ?? 'Unknown error'}</>;
  }

  return <ItemChecklist formResponses={formResponses} bagLabelType={bagLabelType} />;
};

export default ChecklistsPage;
