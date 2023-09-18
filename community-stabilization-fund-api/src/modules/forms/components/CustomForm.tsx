import { Form, Button } from "@carbon/react";

import React from "react";
import { useForm } from "react-hook-form";

import type { FormResponseDTO, QuestionDTO } from "../../../db";

import { CustomQuestionSection } from "./CustomQuestionSection";
import FormResponseService from "../../../services/form-response";
import { isEmpty } from "../../../utils";

interface CustomFormProps {
  questions: QuestionDTO[];
  
}

const CustomForm = ({ questions }: CustomFormProps) => {
  const { setValue, handleSubmit, formState: { isLoading, errors } } = useForm<FormResponseDTO>();
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {!isEmpty(questions) && <CustomQuestionSection questions={questions} onChange={handleCustomQuestionResponse} />}
      {isLoading ? <Button disabled>Submitting</Button> :<Button type='submit'>Submit</Button>}
    </Form>
  );

  function onSubmit(data: FormResponseDTO) {
    FormResponseService.create({ ...data, disable_default_questions: true });
  }

  function handleCustomQuestionResponse(custom_question_responses: string) {
    setValue('custom_question_responses', custom_question_responses);
  }
};

export { CustomForm };