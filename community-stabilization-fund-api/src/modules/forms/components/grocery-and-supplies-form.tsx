import React, { useEffect, useState } from 'react';
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
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm } from 'react-hook-form';

import FormResponseService from '../../../services/form-response';
import { COUNTRY_LIST } from '../constants';

import type { Address, FeminineHealthResponse } from '../../../db/models';

import styles from './../styles/GroceriesAndSupplies.module.css';

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

const GroceryAndSuppliesForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { watch, register, handleSubmit } = useForm<FormData>();

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
          <div className={`${styles.grid}`}>
            <div>
              <TextInput
                id='first_name'
                invalidText=''
                labelText='First Name'
                {...register('first_name', { required: true })}
              />
            </div>
            <div>
              <TextInput
                id='last_name'
                invalidText=''
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
              invalidText=''
              labelText='Email'
              {...register('email', { required: true })}
            />
          </div>
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='is_black'
            defaultValue='placeholder-item'
            labelText='Are you Black? (required)'
            {...register('is_black', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='live_in_southside_atlanta'
            defaultValue='placeholder-item'
            labelText='Do you live in SE or SW Atlanta and within city limits? (required)'
            {...register('live_in_southside_atlanta', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='live_in_pittsburg_atlanta'
            defaultValue='placeholder-item'
            labelText='Do you live Pittsburg Atlanta? (required)'
            {...register('live_in_pittsburgh_atlanta', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='household_members'
            invalidText=''
            labelText='How many people live in your household? (required)'
            type='number'
            {...register('household_members', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='has_flu_symptoms'
            defaultValue='placeholder-item'
            labelText='Does anyone in your home or who you have regular contact with have flu-like symptoms? (required)'
            {...register('has_flu_symptoms', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
        </div>
        <div className={`${styles.grid}`}>
          {' '}
          <TextInput
            id='elderly_members'
            invalidText=''
            labelText='How many elderly members live in your household? (required)'
            type='number'
            {...register('elderly_members', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='youth_members'
            invalidText=''
            labelText='How many youth members live in your household? (required)'
            type='number'
            {...register('youth_members', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <label htmlFor='' className='mb-2'>
            Which package(s) would you like to receive? (required)
          </label>
          <p className='mb-2'>Select the package(s) you need below:</p>
          <div>
            <Checkbox
              labelText={`Food: Fresh fruit /vegetable assortment, Eggs, Cereal, Canned Food, Chicken, Bread. Please indicate if you have any dietary constraints in the space under "Additional Information" below.`}
              id='food'
              value='Food'
              {...register('packages_to_receive')}
            />
            <Checkbox
              labelText={`Cleaning/Health Supplies: All purpose Cleaner, Cleaning Wipes, Hand Sanitizer, Tylenol, Face Masks, Paper Towels, Dish detergent`}
              id='cleaning'
              value='Cleaning/Health Supplies'
              {...register('packages_to_receive')}
            />
            <Checkbox
              labelText={`Feminine Health Care: Feminine Wipes, Menstural Items (Tampons, Thin Pads, and/or Regular Pads)`}
              id='feminine_health_care'
              value='Feminine Health Care'
              {...register('packages_to_receive')}
            />
            <Checkbox
              labelText={`General Hygiene: Toilet Paper, Toothbrush, Toothpaste, Deodorant, Bath Soap`}
              id='general_hygiene'
              value='General Hygiene'
              {...register('packages_to_receive')}
            />
          </div>
        </div>
        <div className={`${styles.grid}`}>
          <div>
            <label htmlFor='' className='mb-2'>
              If you selected Feminine Health Care, how many people in your
              household need these items?
            </label>
            <TextInput
              id='feminine_members'
              invalidText=''
              labelText='Feminine Members'
              type='number'
              {...register('feminine_health_care.feminine_members', {
                required: true,
              })}
            />
          </div>
        </div>
        <div className={styles.grid}>
          <label htmlFor=''>
            If you selected Feminine Hygiene Items, which menstrual items would
            you like?
          </label>
          <div>
            <Checkbox
              labelText={`Thin Pads`}
              id='thin_pads'
              value='Thin Pads'
              {...register('feminine_health_care.hygiene_items')}
            />
            <Checkbox
              labelText={`Regular Pads`}
              id='regular_pads'
              value='Regular Pads'
              {...register('feminine_health_care.hygiene_items')}
            />
            <Checkbox
              labelText={`Maxi Pads`}
              id='maxi_pads'
              value='Maxi Pads'
              {...register('feminine_health_care.hygiene_items')}
            />
            <Checkbox
              labelText={`Tampons (Regular)`}
              id='tampons_regular'
              value='Tampons (Regular)'
              {...register('feminine_health_care.hygiene_items')}
            />
            <Checkbox
              labelText={`Tampons (Super)`}
              id='tampons_super'
              value='Tampons (Super)'
              {...register('feminine_health_care.hygiene_items')}
            />
          </div>
        </div>
        <div className={styles.grid}>
          <Select
            id='needs_plan_b'
            defaultValue='placeholder-item'
            labelText='Do you need Plan B?'
            {...register('feminine_health_care.needs_plan_b')}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
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
            invalidText=''
            labelText='Address Line 1'
            type='text'
            value={ watch('address.line1') ? (watch('address.line1')?.slice(0, 30)) : ''}
            {...register('address.line1', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='line2'
            invalidText=''
            labelText='Address Line 2'
            type='text'
            value={ watch('address.line2') ? (watch('address.line2')?.slice(0, 30)) : ''}
            {...register('address.line2', { required: false })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='pick_up'
            defaultValue='United States of America'
            labelText='Country'
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
            invalidText=''
            labelText='City'
            type='text'
            value={ watch('address.city') ? (watch('address.city')?.slice(0, 30)) : ''}
            {...register('address.city', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='state'
            invalidText=''
            labelText='State'
            type='text'
            value={ watch('address.state') ? (watch('address.state')?.slice(0, 30)) : ''}
            {...register('address.state', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <TextInput
            id='zip_code'
            invalidText=''
            labelText='Zip Code'
            type='text'
            value={ watch('address.zipcode') ? (watch('address.zipcode')?.slice(0, 30)) : ''}
            {...register('address.zipcode', { required: true })}
          />
        </div>

        <div className={styles.grid}>
          <label htmlFor='' className='mb-2'>
            Additional Information
          </label>
          <TextArea
            labelText={`Please include your sizes for any of the above items, or any other additional information that you would like included in your packages (sizes, additional instructions, etc.).`}
            {...register('additional_information')}
          />
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='pick_up'
            defaultValue='placeholder-item'
            labelText='Can you pick up your items?'
            {...register('is_pick_up', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='phone_type'
            defaultValue='placeholder-item'
            labelText='Phone Type:'
            {...register('phone_type', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
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
            labelText='Phone'
            placeholder={'Format: ###-###-####'}
            type='tel'
            invalid={isValidPhoneNumber(watch('phone_number') ?? '')}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            {...register('phone_number', { required: true })}
          />
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='is_volunteering'
            defaultValue='placeholder-item'
            labelText="We package and deliver these items every other week on Saturday at 12:30pm. We're always looking for volunteers to help us reach more people! Would you like to help package and/or deliver these items to other members of the community?"
            helperText="*If you select Yes, we will reach out to you with more information! You don't need a car. If you need assistance with transportation we can arrange that for you!*"
            {...register('is_volunteering', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id='is_subscribing'
            defaultValue='placeholder-item'
            labelText="Would you like to receive regular updates from Community Movement Builders about the organizing and other activities we are doing in the community?"
            helperText="*If you select Yes, we may call/text/email you with updates! We will never share your information with anyone else.*"
            {...register('is_subscribing', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
        </div>
        <div className={`${styles.grid}`}>
          <Select
            id=' is_interested_in_membership'
            defaultValue='placeholder-item'
            labelText='Are you interested in joining Community Movement Builders?'
            helperText="*Community Movement Builders is a member-based collective of black people creating sustainable, self-determining communities through cooperative economic advancement and collective community organizing*"
            {...register('is_interested_in_membership', { required: true })}
          >
            <SelectItem
              disabled
              hidden
              value='placeholder-item'
              text='Choose an option'
            />
            <SelectItem value={true} text='Yes' />
            <SelectItem value={false} text='No' />
          </Select>
        </div>
        <Button type='submit'>Submit</Button>
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

export { GroceryAndSuppliesForm };
