import { RadioButtonGroup, RadioButton } from "@carbon/react"

import styles from './BasicRadioGroup.module.css';

interface BasicRadioGroupProps {
  label?: string;
  legend?: string;
  options: string[];
  handleChange: Function;
} 

const BasicRadioGroup = ({
  label,
  legend,
  options,
  handleChange,
  ...props}: BasicRadioGroupProps) => {
  return (
    <div className={`${styles.grid}`}>
      {label && <label htmlFor="">{label}</label>}
      <RadioButtonGroup
      {...props}
      legendText={legend}
      onChange={handleChange}
      className='mt-2'
      >
        {
          options.map((option, index) => (<RadioButton 
            labelText={option}
            id={`${option}-${index}`}
            value={option}
          />))
        }
      </RadioButtonGroup>
    </div>
  )
}

export { BasicRadioGroup };