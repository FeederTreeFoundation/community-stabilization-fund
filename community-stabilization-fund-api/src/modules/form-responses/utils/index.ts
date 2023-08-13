import type { FormResponseDTO } from "../../../db";

export const mapBooleanToResponse = (response: any, question: string) => {
  const key = question.toLowerCase().replaceAll(" ", "_");

  const isQuestion = question.startsWith('Live') || question.startsWith('Is') || question.startsWith('Has');
  if(isQuestion || typeof response[key] === 'boolean') {
    response[key] = response[key] ? "Yes" : "No";
  }
};

export const getAddress = ({address}: FormResponseDTO) => {
  if(!address) return '';
  const { line1 = '', line2, city, state, country, zipcode } = address;
  if( !line1 && !city && !state && !country && !zipcode ) return '';
  const addressString = `${line1},\n ${line2 ? line2 + ',' : ''}\n ${city}, ${state}, ${country} ${zipcode}`;

  return addressString;
};