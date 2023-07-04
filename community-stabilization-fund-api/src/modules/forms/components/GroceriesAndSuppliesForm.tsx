import { CheckmarkFilled } from '@carbon/icons-react';
import {
  Button,
  TextInput,
  Select,
  SelectItem,
  TextArea,
  Checkbox,
  Form,
} from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from "react-phone-number-input";

import type { Address, FeminineHealthResponse } from '../../../db/models';

import FormResponseService from '../../../services/form-response';

import { COUNTRY_LIST } from '../constants';

import styles from '../styles/GroceriesAndSuppliesForm.module.css';

type FormData = {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone_number: string;
  phone_type?: string | null;
  address: Address | null;
  is_black: boolean;
  is_local: boolean;
  household_members: number;
  has_flu_symptoms: boolean;
  packages_to_receive: string | string[];
  feminine_health_care: FeminineHealthResponse | null;
  item_requests?: string | null;
  additional_information?: string | null;
  plan_b: boolean;
  is_pick_up: boolean;
  is_volunteering: boolean;
  is_subscribing: boolean;
  is_interested_in_membership: boolean;
  submitted_on?: Date | null;
  live_in_pittsburgh_atlanta?: boolean;
  live_in_southside_atlanta?: boolean;
  elderly_members?: number | null;
  youth_members?: number | null;
};

const GroceriesAndSuppliesForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { watch, register, handleSubmit, formState: { isLoading, errors} } = useForm<FormData>();

  const packagesToReceive = watch('packages_to_receive') ? watch('packages_to_receive') as string[] : [];

  useEffect(() => {
    document.querySelector('header')?.classList.add('hidden');
  }, []);

  const onSubmit = handleSubmit((data) => {
    FormResponseService.createFormResponse(data).then(() => {
      setIsSubmitted(!isSubmitted);
    });
  });
  
  if (!isSubmitted) {
    return (
      <Form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label htmlFor='' className='mb-2'>
            Name (Required)
          </label>
          <div className={`${styles.grid} ${styles.name}`}>
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
        <div className={`${styles.grid}`}>
          <div>
            <TextInput
              id='email'
              type='email'
              invalidText='Please enter a valid email address.'
              invalid={!!errors.email}
              labelText='Email (required)'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              {...register('email', { required: true })}
            />
          </div>
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='is_black'
            defaultValue={false}
            labelText='Are you Black? (required)'
            invalidText='Please select an option.'
            invalid={!!errors.is_black}
            {...register('is_black', { required: true })}
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
            id='live_in_southside_atlanta'
            defaultValue={false}
            invalidText='Please select an option.'
            invalid={!!errors.live_in_southside_atlanta}
            labelText='Do you live in SE or SW Atlanta and within city limits? (required)'
            {...register('live_in_southside_atlanta', { required: true })}
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
            id='live_in_pittsburgh_atlanta'
            defaultValue={false}
            invalidText='Please select an option.'
            invalid={!!errors.live_in_pittsburgh_atlanta}
            labelText='Do you live Pittsburgh Atlanta? (required)'
            {...register('live_in_pittsburgh_atlanta', { required: true })}
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
          {' '}
          <TextInput
            id='elderly_members'
            defaultValue={0}
            invalid={!!errors.elderly_members}
            labelText='How many elderly members live in your household? (required)'
            type='number'
            {...register('elderly_members')}
          />
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='youth_members'
            defaultValue={0}
            invalid={!!errors.youth_members}
            labelText='How many youth members live in your household? (required)'
            type='number'
            {...register('youth_members')}
          />
        </div>
        <div className={`${styles.grid}`}>
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
        </div>
        <div className={`${styles.grid}`}>
          <label htmlFor='' className='mb-2'>
            Which package(s) would you like to receive? (required)
          </label>
          <span className='mb-2'>Select the package(s) you need below:</span>
          <div>
            <Checkbox
              labelText={`Food: Fresh fruit /vegetable assortment, Eggs, Cereal, Canned Food, Chicken, Bread. Please indicate if you have any dietary constraints in the space under "Additional Information" below.`}
              id='food'
              className={styles.checkbox_item}
              value='Food'
              {...register('packages_to_receive')}
            />
            <Checkbox
              labelText={`Cleaning/Health Supplies: All purpose Cleaner, Cleaning Wipes, Hand Sanitizer, Tylenol, Face Masks, Paper Towels, Dish detergent`}
              id='cleaning'
              className={styles.checkbox_item}
              value='Cleaning/Health Supplies'
              {...register('packages_to_receive')}
            />
            <Checkbox
              labelText={`Feminine Health Care: Feminine Wipes, Menstural Items (Tampons, Thin Pads, and/or Regular Pads)`}
              id='feminine_health_care'
              className={styles.checkbox_item}
              value='Feminine Health Care'
              {...register('packages_to_receive')}
            />
            <Checkbox
              labelText={`General Hygiene: Toilet Paper, Toothbrush, Toothpaste, Deodorant, Bath Soap`}
              id='general_hygiene'
              className={styles.checkbox_item}
              value='General Hygiene'
              {...register('packages_to_receive')}
            />
          </div>
        </div>
        <div className={`${styles.grid}`}>
          <div>
            <TextInput
              id='feminine_members'
              defaultValue={packagesToReceive.includes('Feminine Health Care') ? 1 : 0}
              invalid={!!errors.feminine_health_care?.feminine_members}
              labelText='If you selected "Feminine Health Care", how many people in your
              household need these items?'
              type='number'
              {...register('feminine_health_care.feminine_members')}
            />
          </div>
        </div>
        <div className={styles.grid}>
          <label>
            {`If you selected "Feminine Health Care", which menstrual items would
            you like?`}
          </label>
          <div>
            <Checkbox
              labelText={`Thin Pads`}
              className={styles.checkbox_item}
              id='thin_pads'
              value='Thin Pads'
              {...register('feminine_health_care.hygiene_items')}
            />
            <Checkbox
              labelText={`Regular Pads`}
              id='regular_pads'
              className={styles.checkbox_item}
              value='Regular Pads'
              {...register('feminine_health_care.hygiene_items')}
            />
            <Checkbox
              labelText={`Maxi Pads`}
              id='maxi_pads'
              className={styles.checkbox_item}
              value='Maxi Pads'
              {...register('feminine_health_care.hygiene_items')}
            />
            <Checkbox
              labelText={`Tampons (Regular)`}
              id='tampons_regular'
              className={styles.checkbox_item}
              value='Tampons (Regular)'
              {...register('feminine_health_care.hygiene_items')}
            />
            <Checkbox
              labelText={`Tampons (Super)`}
              id='tampons_super'
              className={styles.checkbox_item}
              value='Tampons (Super)'
              {...register('feminine_health_care.hygiene_items')}
            />
          </div>
        </div>
        <div className={styles.grid}>
          <Select
            id='needs_plan_b'
            defaultValue={false}
            invalidText='Please select an option.'
            invalid={!!errors.feminine_health_care?.needs_plan_b}
            labelText='Do you need Plan B?'
            {...register('feminine_health_care.needs_plan_b', { required: packagesToReceive.includes('Feminine Health Care') })}
          >
            <SelectItem
              disabled
              hidden
              value={false}
              text='Choose an option'
            />
            <SelectItem value={false} text='No' />
            <SelectItem value={true} text='Yes' />
          </Select>
        </div>
        <div className={styles.grid}>
          <TextArea
            className='mb-2'
            labelText="Additional Information"
            helperText="Please include your sizes for any of the above items, or any other additional information that you would like included in your packages (sizes, additional instructions, etc.)."
            {...register('additional_information')}
          />
        </div>
        <div className={styles.grid}>
          <TextArea
            labelText='Please list any other items you need that are not on the list (There
            is no guarantee these can be provided):'
            {...register('item_requests')}
          />
        </div>
        <div className={styles.grid}>
          <TextInput
            id='line1'
            invalidText='Please enter a valid address.'
            invalid={!!errors.address?.line1}
            labelText='Address Line 1 (required)'
            type='text'
            value={ watch('address.line1') ? (watch('address.line1')?.slice(0, 30)) : ''}
            {...register('address.line1', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='line2'
            invalidText='Please enter a valid address.'
            invalid={!!errors.address?.line2}
            labelText='Address Line 2'
            type='text'
            value={ watch('address.line2') ? (watch('address.line2')?.slice(0, 30)) : ''}
            {...register('address.line2')}
          />
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='country'
            invalidText='Please select a country.'
            invalid={!!errors.address?.country}
            labelText='Country (required)'
            {...register('address.country', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='United States of America'
              text='Choose an option'
            />
            {COUNTRY_LIST.map((country, id) => (
              <SelectItem key={id} value={country} text={country}>
                {country}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='city'
            invalidText='Please enter a valid city.'
            invalid={!!errors.address?.city}
            labelText='City (required)'
            type='text'
            value={ watch('address.city') ? (watch('address.city')?.slice(0, 30)) : ''}
            {...register('address.city', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='state'
            invalidText='Please enter a valid state.'
            invalid={!!errors.address?.state}
            labelText='State (required)'
            type='text'
            value={ watch('address.state') ? (watch('address.state')?.slice(0, 30)) : ''}
            {...register('address.state', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='zip_code'
            invalidText='Please enter a valid zip code.'
            invalid={!!errors.address?.zipcode}
            labelText='Zip Code (required)'
            type='text'
            value={ watch('address.zipcode') ? (watch('address.zipcode')?.slice(0, 30)) : ''}
            {...register('address.zipcode', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='pick_up'
            defaultValue={false}
            invalidText='Please select an option.'
            invalid={!!errors.is_pick_up}
            labelText='Can you pick up your items? (required)'
            {...register('is_pick_up', { required: true })}
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
            id='phone_type'
            invalidText='Please select an option.'
            invalid={!!errors.phone_type}
            defaultValue='Home'
            labelText='Phone Type:'
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
        <div className={`${styles.grid}`}>
          <TextInput
            id='phone'
            invalidText='Please enter a valid phone number'
            labelText='Phone Number (required)'
            placeholder={'###-###-####'}
            type='tel'
            invalid={isValidPhoneNumber(watch('phone_number') ?? '') || !!errors.phone_number}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            {...register('phone_number', { required: true })}
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
            id=' is_interested_in_membership'
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
        {isLoading ? <Button disabled>Submitting</Button> :<Button type='submit'>Submit</Button>}
      </Form>
    );
  } else {
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
};

export { GroceriesAndSuppliesForm };
