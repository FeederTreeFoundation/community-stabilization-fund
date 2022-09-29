import { FormResponse } from "../../../db";

export const mapFormResponseToRecipientInfo = (formResponse: FormResponse) => {
  const { 
    first_name, 
    last_name, 
    phone_number, 
    address_id,
    is_pick_up,
    has_flu_symptoms,
    household_members
  } = formResponse;
  
  return [
    `${first_name} ${last_name}`,
    phone_number,
    address_id,
    `${is_pick_up ? "Pick Up" : "Drop Off"}`,
    `${has_flu_symptoms ? "Yes" : "No"}`,
    household_members
  ];
};