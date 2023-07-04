import { Select, SelectItem } from "carbon-components-react";

import type { SelectProps} from 'carbon-components-react';
import type { ChangeEvent } from "react";

interface BasicSelectProps {
  defaultText?: string;
  items: string[];
}

const BasicSelect = ({ 
  inline,
  defaultValue = null,
  defaultText = "Choose an option",
  invalidText = "A valid value is required",
  id,
  helperText,
  labelText,
  items,
  name = '',
  onChange,
  ...props
}: BasicSelectProps & SelectProps) => {
  const selectItems = items.map(str => (      
    <SelectItem
      key={`${str}-key`}
      text={str}
      value={str}
    />
  ));

  return (
    <Select
      className="basic-select"
      defaultValue={defaultValue}
      helperText={helperText}
      id={id}
      invalidText={invalidText}
      labelText={labelText}
      inline={inline}
      onChange={_handleChange}
      {...props}
    >
      <SelectItem
        text={defaultText}
        value={defaultValue}
      />
      {selectItems}
    </Select>
  );

  // Add custom onchange handler to also handle react-hook-form's onchange
  // by explicitly passing the name and value to the event's target
  function _handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if(typeof onChange !== 'function') return;
    onChange({...e, target: { ...e.target, value: e.target.value, name}});
  }
};

export { BasicSelect };