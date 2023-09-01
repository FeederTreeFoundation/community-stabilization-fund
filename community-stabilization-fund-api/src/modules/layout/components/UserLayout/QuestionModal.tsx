import { 
  Modal,
  Button,
  ComboBox,
  Row,
  TextInput,
  TextArea,
  Heading,
  Section,
  Toggle
} from '@carbon/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { QuestionDTO, UserDTO } from '../../../../db';

import { BasicSelect } from '../../../../components';
import { isEmpty } from '../../../../utils';
import { QUESTION_FORM } from '../../constants';

import styles from '../../styles/UserLayout.module.css';

export interface QuestionModalProps {
  user?: UserDTO;
  questions: QuestionDTO[];
  open: boolean;
  handleClose: (key: string) => void;
  onSubmit: (data: QuestionDTO) => void;
  onDelete?: (id: number) => void;
}

const QuestionModal = ({
  user,
  questions,
  open,
  handleClose,
  onSubmit,
  onDelete,
}: QuestionModalProps) => {
  const defaultMode = isEmpty(questions) ? 'setup' : 'edit';
  const [mode, setMode] = useState<string>(defaultMode);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionDTO>();
  const [questionInput, setQuestionInput] = useState<string>('');
  const [overflowOpen, setOverflowOpen] = useState<boolean>(true);

  const {
    watch,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<QuestionDTO>({
    defaultValues: selectedQuestion
  });

  const form = watch();

  useEffect(() => {
    const initialMode = isEmpty(questions) ? 'setup' : 'add';
    setMode(initialMode);
  }, [isEmpty(questions)]);

  if(mode === 'setup') {
    return (
      <Modal
        open={open}
        modalHeading='Set Up Custom Form Questions'
        modalLabel='Admin functions'
        size={'md'}
        primaryButtonText='Next'
        secondaryButtonText='Cancel'
        onRequestClose={() => handleClose('questionModal')}
        onRequestSubmit={next}
      >
        <p>
          You can add custom questions that will be displayed to the user when they are filling out the form.
          <ul className='mt-4'>
            <li>
              - Decide who can see the question by selecting the 'internal' or 'public' <strong>type</strong> field.
            </li>
            <li>
              - Add additional information to your question text using the <strong>helper text</strong> field.
            </li>
            <li>
              - Change the input from accepting answers as text by selecting from the <strong>role</strong> field.
            </li>
            <li>
              - Decide whether the question is required by toggling the <strong>required</strong> field.
            </li>
            <li>
              - Additionally, you can hide any question from your form by selecting the <strong>hidden</strong> field.
            </li>
          </ul>
          <div className='mt-4'>Click 'Next' to continue.</div>
        </p>
      </Modal>
    );
  }
  
  return (
    <Modal
      open={open}
      className={styles.questions_modal}
      modalHeading='Configure Form Questions'
      modalLabel='Admin functions'
      size={'md'}
      primaryButtonText='Submit'
      secondaryButtonText={mode === 'edit' ? 'Cancel' : 'Back'}
      onRequestSubmit={submitQuestion}
      onSecondarySubmit={() => mode === 'edit' ? handleClose('questionModal') : setMode('setup')}
      onRequestClose={() => handleClose('questionModal')}
      primaryButtonDisabled={isEmpty(selectedQuestion)}
      preventCloseOnClickOutside
    >
      <Row className={`${styles.select_question_wrapper} ${ overflowOpen ? 'mb-10' : ''}`}>
        <ComboBox 
          id='select-question-combo-box'
          className={styles.combo_box}
          items={[...questions]}
          itemToString={(item: QuestionDTO) => item?.text}
          titleText='Add or Select Form Question'
          placeholder={'Select or type a question'}
          onChange={selectQuestion}
          onInputChange={handleQuestionInput}
          shouldFilterItem={handleFilter}
        />
        { selectedQuestion ? (
          <Button kind='tertiary' size='md' onClick={cancelNewQuestion}>
              Cancel
          </Button>
        ) : (
          <Button kind='primary' size='md' onClick={selectNewQuestion}>
              Add New Question
          </Button>
        )}
      </Row>
      <Row className={styles.question_form_wrapper}>
        { selectedQuestion && (
          <Section level={4}>
              <div className='row'>
                <div className='column' >
                  <Heading className={`${styles.heading} mb-2`} size='sm'>{`${mode.toUpperCase()} QUESTION`}</Heading>
                </div>
                <div className='column mr-4'>
                  {mode === 'edit' && <Button kind='danger--ghost' size='sm' onClick={deleteQuestion}>
                    Delete
                  </Button>}
                </div>
              </div>
            <TextInput
              id='question-text'
              className='mt-2'
              labelText='Question Text'
              defaultValue={selectedQuestion?.text}
              {...register('text', { required: true })}
              invalid={!!errors.text}
              invalidText={errors.text?.message}
            />
            <TextArea
              id='question-helper-text'
              className='mt-2'
              labelText={QUESTION_FORM.HELPER_TEXT.label}
              rows={1}
              {...register('helper_text', { required: false })}
              invalid={!!errors.helper_text}
              invalidText={errors.helper_text?.message}
            />
            <BasicSelect 
              id='question-type'
              className='mt-2'
              items={QUESTION_FORM.TYPE.items}
              labelText={QUESTION_FORM.TYPE.label}
              {...register('type', { required: true })}
              invalid={!!errors.type}
            />
            <BasicSelect 
              id='question-role'
              className='mt-2'
              items={QUESTION_FORM.ROLE.items}
              labelText={QUESTION_FORM.ROLE.label}
              {...register('role', { required: false })}
              invalid={!!errors.role}
            />
            { ['select', 'radio', 'checkbox'].includes(form.role ?? '') && (
              <TextInput 
                id='question-options'
                className='mt-2'
                labelText={QUESTION_FORM.OPTIONS.label}
                helperText={QUESTION_FORM.OPTIONS.helperText}
                {...register('options', { required: true })}
                invalid={!!errors.options}
                invalidText={errors.options?.message}
              />
            )}
            <Toggle
              id='question-required'
              className={`${styles.toggle}`}
              aria-label='toggle question required'
              labelText='Required'
              defaultToggled={!!selectedQuestion?.required}
              {...register('required', { required: true })}
              onToggle={() => setValue('required', !form.required)}
              hideLabel
            />
            <Toggle
              id='question-hidden'
              className={`${styles.toggle}`}
              aria-label='toggle question hidden'
              labelText='Hidden'
              defaultToggled={!!selectedQuestion?.hidden}
              {...register('hidden', { required: true })}
              onToggle={() => setValue('hidden', !form.hidden)}
              hideLabel
            />
          </Section>
        )}
      </Row>
    </Modal>
  );

  function addQuestion() {
    onSubmit({ ...form, organization_id: user?.organization_id } as QuestionDTO);
    reset();
  }

  function updateQuestion() {
    onSubmit({ ...form, id: selectedQuestion?.id } as QuestionDTO);
    reset(); 
  }

  function deleteQuestion(e: any) {
    e.preventDefault();
    if(typeof onDelete !== 'function') return;

    selectedQuestion?.id && onDelete(selectedQuestion?.id);
    setSelectedQuestion(undefined);
    reset();
  }

  function submitQuestion(e: any) {
    e.preventDefault();
    if(typeof onSubmit !== 'function') return;

    mode === 'edit' ? updateQuestion() : addQuestion();
    setSelectedQuestion(undefined);
  }

  function selectQuestion({ selectedItem }: { selectedItem: QuestionDTO}) {
    setOverflowOpen(isEmpty(selectedItem));
    setSelectedQuestion(selectedItem);
    reset(selectedItem);
    setMode('edit');
  }

  function selectNewQuestion() {
    setOverflowOpen(false);
    setSelectedQuestion({ text: questionInput} as QuestionDTO);
    setValue('text', questionInput);
    setMode('add');
  }

  function cancelNewQuestion() {
    setOverflowOpen(true);
    setSelectedQuestion(undefined);
    setQuestionInput('');
    reset();
  }

  function handleQuestionInput(input: string) {
    setQuestionInput(input);
  }

  function next() {
    setMode('add');
  }

  function handleFilter({ item, inputValue }: { item: QuestionDTO, inputValue: string }) {
    if(!inputValue) return true;
  
    return item.text.toLowerCase().includes(inputValue.toLowerCase());
  }

};

export { QuestionModal };