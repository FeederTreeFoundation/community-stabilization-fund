import { Checkbox } from "@carbon/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { FormResponseDTO } from "../../../db";

import { BasicRadioGroup } from "../../../components/BasicRadioGroup/BasicRadioGroup";
import { ETHNICITY_LIST, RACE_LIST } from "../constants";

import styles from '../styles/GroceriesAndSuppliesForm.module.css';


interface RaceEthnicitySectionProps {
  handleChange: ({ race, ethnicity }: FormResponseDTO) => void;
}

const RaceEthnicitySection = ({ handleChange }: RaceEthnicitySectionProps) => {
  const { watch, register, setValue } = useForm<{ races: string[], ethnicities: string[]}>();
  const {races = [], ethnicities = []} = watch();
  
  useEffect(() => {
    if(typeof handleChange !== 'function') return;
    if(!races || !ethnicities) return;
    
    const race = RACE_LIST.filter(r => races?.includes(r)).join(', ');
    const ethnicity = ETHNICITY_LIST.find(e => ethnicities?.includes(e)) ?? '';
    handleChange({race, ethnicity} as FormResponseDTO);
  }, [races, ethnicities, handleChange]);
  
  return (
    <div className={`${styles.grid}`}>
      <label htmlFor='' className='mb-2'>
        What is your race and/or ethnicity? (required)
      </label>
      <span>Select your race(s) below:</span>
      <div className='row'>
        {
          RACE_LIST.map((option, index) => (<Checkbox 
            labelText={option}
            id={`${option}-${index}`}
            key={`${option}-${index}`}
            value={option}
            {...register('races', { required: true })}
          />))
        }
      </div>
      <span className='mb-2'>Select your ethnicity below:</span>
      <BasicRadioGroup 
        {...register('ethnicities', { required: false })}
        options={ETHNICITY_LIST}
        handleChange={handleEthnicityChange}
      />
    </div>
  );

  function handleEthnicityChange(value: string) {
    setValue('ethnicities', [value]);
  }
};

export { RaceEthnicitySection };