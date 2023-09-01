import { useUser } from '@auth0/nextjs-auth0';
import { CheckmarkFilled } from '@carbon/icons-react';
import React, { useContext, useState } from 'react';

import type { FormResponseDTO } from '../../../db/models';

import { DefaultForm } from './DefaultForm';
import FormResponseService from '../../../services/form-response';
import { FormQuestionsContext } from '../contexts';

import styles from '../styles/GroceriesAndSuppliesForm.module.css';

interface GroceriesAndSuppliesFormProps {
  formType?: string;
}

const GroceriesAndSuppliesForm = ({ formType = 'public' }: GroceriesAndSuppliesFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { user, error } = useUser();
  const { questions, disableDefaultQuestions } = useContext(FormQuestionsContext);

  const filteredQuestions = questions.filter(question => question.type === formType);
  
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

  if(disableDefaultQuestions) {
    return (
      <></>
    );
  }

  return (<DefaultForm onSubmit={onSubmit} questions={filteredQuestions} />);

  function onSubmit(data: FormResponseDTO) {
    FormResponseService.create({
      ...data,
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
