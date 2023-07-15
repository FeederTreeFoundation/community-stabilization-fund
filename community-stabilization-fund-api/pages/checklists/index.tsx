import { useState, useEffect, useContext } from 'react';

import type { FormResponse } from '../../src/db';
import type { NextPage } from 'next';

import {
  ItemChecklistByRecipient,
  ItemChecklistByBag,
  ChecklistsRulesContext,
  ItemChecklistByBagDymo,
} from '../../src/modules/checklists';

import FormResponseService from '../../src/services/form-response';

const ChecklistsPage: NextPage = () => {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  const [error, setError] = useState<Error>();
  const { rules } = useContext(ChecklistsRulesContext);
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

  if (error || formResponses.length === 0)
    return <>{error?.message ?? 'Unknown error'}</>;

  if (
    rules[0] &&
    rules[0].bagLabelType &&
    rules[0].bagLabelType === 'Dymo Bag Label 2-5/16" x 4"'
  ) {
    return (
      <>
        {formResponses?.map((formResponse) => (
          <>
            <ItemChecklistByBagDymo formResponse={formResponse} />
          </>
        ))}
      </>
    );
  } else {
    return (
      <>
        {formResponses.map((formResponse) => (
          <>
            <ItemChecklistByRecipient formResponse={formResponse} />
            <ItemChecklistByBag formResponse={formResponse} />
          </>
        ))}
      </>
    );
  }
};

export default ChecklistsPage;
