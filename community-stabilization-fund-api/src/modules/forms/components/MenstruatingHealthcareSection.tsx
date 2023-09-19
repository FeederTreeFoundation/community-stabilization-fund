import { TextInput, Checkbox, Select, SelectItem } from "@carbon/react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { MenstruatingHealthResponseDTO } from "../../../db";

import styles from '../styles/GroceriesAndSuppliesForm.module.css';

interface MenstruatingHealthcareSectionProps {
  packagesToReceive: string[];
  handleChange: (data: MenstruatingHealthResponseDTO) => void;
}

const MenstruatingHealthcareSection = ({
  packagesToReceive,
  handleChange
}: MenstruatingHealthcareSectionProps) => {
  const { watch, register, formState: { errors } } = useForm<MenstruatingHealthResponseDTO>();

  const menstruatingHealthResponse = watch();

  useEffect(() => {
    if(typeof handleChange !== 'function') return;
    handleChange(menstruatingHealthResponse);
  }, [menstruatingHealthResponse, handleChange]);

  return (
    <>
      <div className={`${styles.grid}`}>
        <div>
          <TextInput
            id='menstruating_members'
            defaultValue={packagesToReceive.includes('Menstrual Hygiene Package') ? 1 : 0}
            invalid={!!errors.menstruating_members}
            labelText='If you selected "Menstrual Hygiene Package", how many people in your
          household need these items?'
            type='number'
            {...register('menstruating_members')}
          />
        </div>
      </div>
      <div className={styles.grid}>
        <label>
        If you selected &#34;Menstrual Hygiene Package&#34;, which menstrual items would you like?
        </label>
        <div>
          <Checkbox
            labelText={`Thin Pads`}
            className={styles.checkbox_item}
            id='thin_pads'
            value='Thin Pads'
            {...register('hygiene_items')}
          />
          <Checkbox
            labelText={`Regular Pads`}
            id='regular_pads'
            className={styles.checkbox_item}
            value='Regular Pads'
            {...register('hygiene_items')}
          />
          <Checkbox
            labelText={`Maxi Pads`}
            id='maxi_pads'
            className={styles.checkbox_item}
            value='Maxi Pads'
            {...register('hygiene_items')}
          />
          <Checkbox
            labelText={`Tampons (Regular)`}
            id='tampons_regular'
            className={styles.checkbox_item}
            value='Tampons (Regular)'
            {...register('hygiene_items')}
          />
          <Checkbox
            labelText={`Tampons (Super)`}
            id='tampons_super'
            className={styles.checkbox_item}
            value='Tampons (Super)'
            {...register('hygiene_items')}
          />
        </div>
      </div>
      <div className={styles.grid}>
        <Select
          id='needs_plan_b'
          defaultValue={false}
          invalidText='Please select an option.'
          invalid={!!errors.needs_plan_b}
          labelText='Do you need a reproductive care package? (includes emergency contraceptive)'
          {...register('needs_plan_b', { required: packagesToReceive.includes('Menstrual Hygiene Package') })}
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
    </>
  );
};

export { MenstruatingHealthcareSection };