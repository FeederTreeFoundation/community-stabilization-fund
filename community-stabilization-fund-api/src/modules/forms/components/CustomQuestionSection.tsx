import { useForm } from "react-hook-form";

import type { QuestionDTO } from "../../../db";

import { CustomQuestionInput } from "./CustomQuestionInput";

interface CustomQuestionSectionProps {
  questions: QuestionDTO[];
  onChange?: (data: QuestionDTO[]) => void;
}

interface FormData {
  custom_fields: { [key: string]: string };
}

const CustomQuestionSection = ({ questions, onChange }: CustomQuestionSectionProps) => {
  const { watch, register, formState: { errors } } = useForm<FormData>();
  const custom_fields = watch('custom_fields');
  console.log({custom_fields, register, errors});
  return (
    <div>
      {questions.map((question, index) => (
        <CustomQuestionInput 
          key={index} 
          question={question}
          register={register}
          errors={errors}
        />
      ))}
    </div>
  );
};

export { CustomQuestionSection };