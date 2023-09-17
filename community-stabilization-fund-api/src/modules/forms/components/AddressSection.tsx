import { TextInput, Select, SelectItem } from "@carbon/react";
import { AddressDTO } from "../../../db";
import { useForm } from "react-hook-form";
import { COUNTRY_LIST } from "../constants";

import styles from "../styles/GroceriesAndSuppliesForm.module.css";
import { useEffect } from "react";

interface AddressSectionProps {
  handleChange: (data: AddressDTO) => void;
}

const AddressSection = ({ handleChange }: AddressSectionProps) => {
  const { watch, register, formState: { errors } } = useForm<AddressDTO>();
  const address = watch();

  useEffect(() => {
    if(typeof handleChange !== 'function') return;
    handleChange(address);
  }, [address, handleChange]);

  return (
    <>
      <div className={styles.grid}>
      <TextInput
        id='line1'
        invalidText='Please enter a valid address.'
        invalid={!!errors.line1}
        labelText='Address Line 1 (required)'
        type='text'
        value={ watch('line1') ? (watch('line1')?.slice(0, 30)) : ''}
        {...register('line1', { required: true })}
      />
      </div>
      <div className={`${styles.grid}`}>
        <TextInput
          id='line2'
          invalidText='Please enter a valid address.'
          invalid={!!errors.line2}
          labelText='Address Line 2'
          type='text'
          value={ watch('line2') ? (watch('line2')?.slice(0, 30)) : ''}
          {...register('line2')}
        />
      </div>
      <div className={`${styles.grid}`}>
        <TextInput
          id='city'
          invalidText='Please enter a valid city.'
          invalid={!!errors.city}
          labelText='City (required)'
          type='text'
          value={ watch('city') ? (watch('city')?.slice(0, 30)) : ''}
          {...register('city', { required: true })}
        />
      </div>
      <div className={`${styles.grid}`}>
        <TextInput
          id='state'
          invalidText='Please enter a valid state.'
          invalid={!!errors.state}
          labelText='State (required)'
          type='text'
          value={ watch('state') ? (watch('state')?.slice(0, 30)) : ''}
          {...register('state', { required: true })}
        />
      </div>
      <div className={`${styles.grid}`}>
        <Select
          id='country'
          invalidText='Please select a country.'
          invalid={!!errors.country}
          labelText='Country (required)'
          {...register('country', { required: true })}
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
          id='zip_code'
          invalidText='Please enter a valid zip code.'
          invalid={!!errors.zipcode}
          labelText='Zip Code (required)'
          type='text'
          value={ watch('zipcode') ? (watch('zipcode')?.slice(0, 30)) : ''}
          {...register('zipcode', { required: true })}
        />
      </div>
    </>
  )
}

export { AddressSection };