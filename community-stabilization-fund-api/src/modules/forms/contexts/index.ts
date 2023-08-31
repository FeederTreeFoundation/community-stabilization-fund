import { createContext } from 'react';

import type { QuestionDTO } from '../../../db';

interface FormQuestionsContextProps {
  questions: QuestionDTO[];
  disableDefaultQuestions: boolean;
  updateQuestions?: Function;
  updateDisableDefaultQuestions?: Function;
}

export const FormQuestionsContext =
  createContext<FormQuestionsContextProps>({ questions: [], disableDefaultQuestions: false });
