import { createContext } from 'react';

import type { QuestionDTO } from '../../../db';

interface FormQuestionsContextProps {
  questions: QuestionDTO[];
  disableDefaultQuestions: string;
  updateQuestions?: Function;
  updateDisableDefaultQuestions?: Function;
}

export const FormQuestionsContext =
  createContext<FormQuestionsContextProps>({ questions: [], disableDefaultQuestions: '' });
