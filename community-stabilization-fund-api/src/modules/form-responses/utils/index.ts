import { FormResponse } from "../../../db";

export const mapBooleanToResponse = (response: any, question: string) => {
  const key = question.toLowerCase().replaceAll(" ", "_")

  const isQuestion = question.startsWith('Live') || question.startsWith('Is') || question.startsWith('Has')
  if(isQuestion || typeof response[key] === 'boolean') {
    response[key] = response[key] ? "Yes" : "No";
  }
};

export const getAddress = (response: FormResponse) => {
  const { address_line1, address_line2, address_city, address_state, address_country, address_zip } = response;
  if( !address_line1 && !address_city && !address_state && !address_country && !address_zip ) return '';
  const address = `${address_line1}, ${address_line2 ?? ''}, ${address_city}, ${address_state}, ${address_country} ${address_zip}`;

  return address;
};