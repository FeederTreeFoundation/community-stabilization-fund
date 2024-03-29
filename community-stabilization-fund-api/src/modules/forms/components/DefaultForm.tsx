import { Form, TextInput, Select, SelectItem, Checkbox, TextArea, Button }  from "@carbon/react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";

import type { FormResponseDTO, QuestionDTO } from "../../../db";

import { AddressSection } from "./AddressSection";
import { CustomQuestionSection } from "./CustomQuestionSection";
import { MenstruatingHealthcareSection } from "./MenstruatingHealthcareSection";
import { RaceEthnicitySection } from "./RaceEthnicitySection";
import { BasicRadioGroup } from "../../../components/BasicRadioGroup/BasicRadioGroup";
import { isEmpty } from "../../../utils";

import styles from '../styles/GroceriesAndSuppliesForm.module.css';

interface DefaultFormProps {
  defaultQuestionsDisabled?: boolean;
  questions?: QuestionDTO[];
  onSubmit: (data: any) => void;
}

const DefaultForm = ({
  defaultQuestionsDisabled = false,
  questions = [],
  onSubmit
}: DefaultFormProps) => {
  const { watch, register, setValue, handleSubmit, formState: { isLoading, errors} } = useForm<FormResponseDTO>();
  const packagesToReceive = watch('packages_to_receive') ? watch('packages_to_receive') as string[] : [];

  return (
    <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='mb-2'>
          Name (required)
        </label>
        <div className={`${styles.grid} ${styles.inline}`}>
          <div>
            <TextInput
              id='first_name'
              invalidText='Please enter a valid first name.'
              invalid={!!errors.first_name}
              pattern='[a-zA-Z]+'
              labelText='First Name'
              {...register('first_name', { required: true })}
            />
          </div>
          <div>
            <TextInput
              id='last_name'
              invalidText='Please enter a valid last name.'
              invalid={!!errors.last_name}
              pattern='[a-zA-Z]+'
              labelText='Last Name'
              {...register('last_name', { required: true })}
            />
          </div>
        </div>
      </div>
      <label className='mb-2'>
          Phone (required)
      </label>
      <div className={`${styles.grid} ${styles.inline}`}>
        <div className={styles.phone_type}>
          <Select
            id='phone_type'
            invalidText='Please select an option.'
            invalid={!!errors.phone_type}
            defaultValue='Home'
            labelText='Phone Type'
            {...register('phone_type')}
          >
            <SelectItem
              disabled
              hidden
              value='Home'
              text='Choose an option'
            />
            <SelectItem value='cell' text='Cell' />
            <SelectItem value='home' text='Home' />
            <SelectItem value='work' text='Work' />
          </Select>
        </div>
        <div>
          <TextInput
            id='phone'
            invalidText='Please enter a valid phone number'
            labelText='Phone Number'
            placeholder={'###-###-####'}
            type='tel'
            invalid={isValidPhoneNumber(watch('phone_number') ?? '') || !!errors.phone_number}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            {...register('phone_number', { required: true })}
          />
        </div>
      </div>
      <div className={`${styles.grid}`}>
        <div>
          <TextInput
            id='email'
            type='email'
            invalidText='Please enter a valid email address.'
            invalid={!!errors.email}
            labelText='Email (required)'
            pattern='^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'
            {...register('email', { required: true })}
          />
        </div>
      </div>
      { !defaultQuestionsDisabled && (
        <>
          <AddressSection handleChange={handleAddressChange} />
          <div className={`${styles.grid}`}>
            <TextInput
              id='household_members'
              defaultValue={1}
              invalid={!!errors.household_members}
              labelText='How many people live in your household? (required)'
              type='number'
              {...register('household_members', { required: true })}
            />
          </div>
          <div className={`${styles.grid}`}>
            <label htmlFor='' className='mb-2'>
            Which package(s) would you like to receive? (required)
            </label>
            <span className='mb-2'>Select the package(s) you need below:</span>
            <div>
              <Checkbox
                labelText={`Food: Chicken, Cereal, Canned Goods, and assorted fruits and vegetables. Please indicate if you have any dietary constraints in the space under "Additional Information" below.`}
                id='food'
                className={styles.checkbox_item}
                value='Food'
                {...register('packages_to_receive')}
              />
              <Checkbox
                labelText={`Cleaning/Health Supplies: All Purpose Cleaner, Dish Soap, Paper Towels`}
                id='cleaning'
                className={styles.checkbox_item}
                value='Cleaning/Health Supplies'
                {...register('packages_to_receive')}
              />
              <Checkbox
                labelText={`General Hygiene: Toilet Paper, Bar Soap, Deodorant, Toothbrushes, & Toothpaste`}
                id='general_hygiene'
                className={styles.checkbox_item}
                value='General Hygiene'
                {...register('packages_to_receive')}
              />
              <Checkbox
                labelText={`Menstrual Hygiene Package: Pads (Maxi, Regular, or Thin) & Tampons (Regular or Super)`}
                id='menstrual_health_care'
                className={styles.checkbox_item}
                value='Menstrual Hygiene Package'
                {...register('packages_to_receive')}
              />
            </div>
          </div>
          {
            packagesToReceive.includes('Menstrual Hygiene Package') && (
              <MenstruatingHealthcareSection 
                packagesToReceive={packagesToReceive}
                handleChange={handleHealthResponseChange}
              />
            )
          }
          <RaceEthnicitySection handleChange={handleRaceAndEthnicityChange} />
          <BasicRadioGroup
            label='How will you be picking up your package? (required)'
            handleChange={handleTransportPrefenceChange}
            options={["I'm transporting myself", "I need a ride", "I can't make it in person"]}
            {...register('transport_preference')}
          />
          <div className={`${styles.grid} mt-2`}>
            <TextInput
              id='youth_members'
              defaultValue={0}
              invalid={!!errors.youth_members}
              labelText='How many children live in your household? (required)'
              type='number'
              {...register('youth_members')}
            />
          </div>
          <div className={`${styles.grid} mt-2`}>
            <TextInput
              id='elderly_members'
              defaultValue={0}
              invalid={!!errors.elderly_members}
              labelText='How many elders (age 62+) live in your household? (required)'
              type='number'
              {...register('elderly_members')}
            />
          </div>
          {/* TODO: Extract to its own component to be added by admin user input */}
          {/* <div className={`${styles.grid}`}>
            <Select
              id='has_flu_symptoms'
              defaultValue={false}
              invalidText='Please select an option.'
              invalid={!!errors.has_flu_symptoms}
              labelText='Does anyone in your home or who you have regular contact with have flu-like symptoms? (required)'
              {...register('has_flu_symptoms', { required: true })}
            >
              <SelectItem
                disabled
                hidden
                value={false}
                text='Choose an option'
              />
              <SelectItem value={true} text='Yes' />
              <SelectItem value={false} text='No' />
            </Select>
          </div> */}
          {/* TODO: Extract to its own component to be added by admin user input */}
          {/* <div className={styles.grid}>
            <TextArea
              className='mb-2'
              labelText="Additional Information"
              helperText="Please include your sizes for any of the above items, or any other additional information that you would like included in your packages (sizes, additional instructions, etc.)."
              {...register('additional_information')}
            />
          </div> */}
          <div className={styles.grid}>
            <TextArea
              labelText='Please list any other items you need that are not on the list (There
              is no guarantee these can be provided):'
              {...register('item_requests')}
            />
          </div>
          <div className={`${styles.grid}`}>
            <Select
              id='is_volunteering'
              defaultValue={false}
              labelText="We package and deliver these items every other week on Saturday at 12:30pm. We're always looking for volunteers to help us reach more people! Would you like to help package and/or deliver these items to other members of the community?"
              helperText="*If you select Yes, we will reach out to you with more information! You don't need a car. If you need assistance with transportation we can arrange that for you!*"
              {...register('is_volunteering')}
            >
              <SelectItem
                disabled
                hidden
                value={false}
                text='Choose an option'
              />
              <SelectItem value={true} text='Yes' />
              <SelectItem value={false} text='No' />
            </Select>
          </div>
          <div className={`${styles.grid}`}>
            <Select
              id='is_subscribing'
              defaultValue={false}
              labelText="Would you like to receive regular updates from Community Movement Builders about the organizing and other activities we are doing in the community?"
              helperText="*If you select Yes, we may call/text/email you with updates! We will never share your information with anyone else.*"
              {...register('is_subscribing')}
            >
              <SelectItem
                disabled
                hidden
                value={false}
                text='Choose an option'
              />
              <SelectItem value={true} text='Yes' />
              <SelectItem value={false} text='No' />
            </Select>
          </div>
          <div className={`${styles.grid}`}>
            <Select
              id='is_interested_in_membership'
              defaultValue={false}
              labelText='Are you interested in joining Community Movement Builders?'
              helperText="*Community Movement Builders is a member-based collective of black people creating sustainable, self-determining communities through cooperative economic advancement and collective community organizing*"
              {...register('is_interested_in_membership')}
            >
              <SelectItem
                disabled
                hidden
                value={false}
                text='Choose an option'
              />
              <SelectItem value={true} text='Yes' />
              <SelectItem value={false} text='No' />
            </Select>
          </div>
        </>
      )}
      {!isEmpty(questions) && <CustomQuestionSection questions={questions} onChange={handleCustomQuestionResponse} />}
      {isLoading ? <Button disabled>Submitting</Button> :<Button type='submit'>Submit</Button>}
    </Form>
  );

  function handleCustomQuestionResponse(custom_question_responses: string) {
    setValue('custom_question_responses', custom_question_responses);
  }

  function handleAddressChange(address: FormResponseDTO['address']) {
    setValue('address', address);
  }

  function handleHealthResponseChange(health_response: FormResponseDTO['menstrual_health_care']) {
    setValue('menstrual_health_care', health_response);
  }

  function handleRaceAndEthnicityChange({race, ethnicity}: FormResponseDTO) {
    setValue('race', race);
    setValue('ethnicity', ethnicity);
  }

  function handleTransportPrefenceChange(transport_preference: FormResponseDTO['transport_preference']) {
    setValue('transport_preference', transport_preference);
  }
};

export { DefaultForm };