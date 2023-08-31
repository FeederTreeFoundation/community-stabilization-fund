import { TextInput } from "@carbon/react";
import { QuestionDTO } from "../../../db";

import styles from '../styles/GroceriesAndSuppliesForm.module.css';
import { BasicSelect } from "../../../components";
import { TextArea } from "@carbon/react";

interface CustomQuestionInputProps {
  question: QuestionDTO;
  register?: Function;
  errors?: { [key: string]: any };
}

const CustomQuestionInput = ({ question, register, errors, ...props }: CustomQuestionInputProps) => {
  if( typeof register !== 'function') return (<></>);

  if(question.role === 'textarea') {
    return (
      <div className={styles.grid}>
        <TextArea
          className='mb-2'
          labelText={`${question.text} ${question.required ? '(required)' : ''}`}
          helperText={question.helper_text ?? ''}
          invalidText={errors?.custom_fields?.[`question_${question.id}`]?.message}
          invalid={!!errors?.custom_fields?.[`question_${question.id}`]}
          hidden={question.hidden}
          {...register(`custom_fields.question_${question.id}`, { required: question.required })}
          {...props}
        />
      </div>
    )
  }

  if(question.role === 'select') {
    return (
      <div className={`${styles.grid}`}>
        <BasicSelect
          id={`custom-question-${question.id}`}
          items={question.options?.split(',') ?? []}
          labelText={`${question.text} ${question.required ? '(required)' : ''}`}
          helperText={question.helper_text ?? ''}
          invalidText={errors?.custom_fields?.[`question_${question.id}`]?.message}
          invalid={!!errors?.custom_fields?.[`question_${question.id}`]}
          hidden={question.hidden}
          {...register(`custom_fields.question_${question.id}`, { required: question.required })}
          {...props}
        />
      </div>
    )
  }

  return (
    <div className={`${styles.grid}`}>
        <TextInput
          id={`custom-question-${question.id}`}
          labelText={`${question.text} ${question.required ? '(required)' : ''}`}
          helperText={question.helper_text ?? ''}
          invalidText={errors?.custom_fields?.[`question_${question.id}`]?.message}
          invalid={!!errors?.custom_fields?.[`question_${question.id}`]}
          hidden={question.hidden}
          {...register(`custom_fields.question_${question.id}`, { required: question.required })}
          {...props}
        />
    </div>
  )
};

export { CustomQuestionInput };

