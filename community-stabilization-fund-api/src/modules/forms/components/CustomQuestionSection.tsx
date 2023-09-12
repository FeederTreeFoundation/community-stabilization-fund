import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { AnswerDTO, QuestionDTO } from "../../../db";

import { CustomQuestionInput } from "./CustomQuestionInput";
import { isEmpty } from "../../../utils";

interface CustomQuestionSectionProps {
  questions: QuestionDTO[];
  onChange?: (data: string) => void;
}

interface FormData {
  custom_fields: AnswerDTO[];
}

const CustomQuestionSection = ({ questions, onChange }: CustomQuestionSectionProps) => {
  const { watch, register, formState: { errors } } = useForm<FormData>();
  const custom_fields = watch('custom_fields');
  const customFieldsJSON = JSON.stringify(custom_fields);
  
  useEffect(() => {
    function setCustomQuestionResponses() {
      if(isEmpty(custom_fields)) return;
      if(typeof onChange !== 'function') return;
      const customQuestionResponses = Object.entries(custom_fields).map(([key, value]) => ({
        question_id: key.slice(12),
        text: value
      }));
      
      onChange(JSON.stringify(customQuestionResponses));
    }

    setTimeout(setCustomQuestionResponses, 500);
  }, [customFieldsJSON, custom_fields, onChange]);
  
  return (
    <>
      {questions.map((question, index) => (
        <CustomQuestionInput
          key={index}
          question={question}
          register={register}
          errors={errors}
        />
      ))}
    </>
  );
};

export { CustomQuestionSection };