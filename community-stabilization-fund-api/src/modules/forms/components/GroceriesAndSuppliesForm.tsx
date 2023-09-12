import { useUser } from '@auth0/nextjs-auth0';
import { CheckmarkFilled } from '@carbon/icons-react';
import React, { useContext, useMemo, useState } from 'react';

import type { FormResponseDTO } from '../../../db/models';

import { DefaultForm } from './DefaultForm';
import FormResponseService from '../../../services/form-response';
import { FormQuestionsContext } from '../contexts';

import styles from '../styles/GroceriesAndSuppliesForm.module.css';
import { isEmpty } from '../../../utils';

interface GroceriesAndSuppliesFormProps {
  formType?: string;
}

const GroceriesAndSuppliesForm = ({ formType = 'public' }: GroceriesAndSuppliesFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { user, error } = useUser();
  const { questions, disableDefaultQuestions } = useContext(FormQuestionsContext);

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => question.type === formType)
  }, [questions.length, formType]);
  
  const defaultQuestionsDisabled = useMemo(() => {
    const raw = !isEmpty(disableDefaultQuestions) ? JSON.parse(disableDefaultQuestions) : {};
    return formType === 'internal' ? raw['disable-internal-default-questions'] : raw['disable-default-public-questions'];
  }, [ disableDefaultQuestions ]);
  
  if(error) {
    console.warn(error);
  }
  
  if (isSubmitted) {
    return (
      <div className={styles.submitted}>
        <p>
          *Please note, this program is specifically for Black residents who
          live in the Southside of the city of Atlanta. You must live in the
          city limits and have SE or SW in your address. If you do not fit these
          demographics, we may not be able to assist you with this program.
        </p>
        <p className={styles.thank_you}>
          {' '}
          Thank you!
          <CheckmarkFilled className={styles.checkmark} />
        </p>
      </div>
    );
  }

  if(defaultQuestionsDisabled) {
    return (
      <DefaultForm defaultQuestionsDisabled questions={filteredQuestions} onSubmit={onSubmit} />
    );
  }

  return (<DefaultForm onSubmit={onSubmit} questions={filteredQuestions} />);

  function onSubmit(data: FormResponseDTO) {
    FormResponseService.create({
      ...data,
      disable_default_questions: defaultQuestionsDisabled,
      submitted_by: user?.email ?? 'recipient'
    })
      .then(() => {
        setIsSubmitted(!isSubmitted);
      })
      .catch(err => {
        console.error(err);
        alert('Form submission failed. Please try again later.');
      });
  }
};

export { GroceriesAndSuppliesForm };
