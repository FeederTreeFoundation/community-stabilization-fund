import React from "react";
// import styles from './styles/FormResponsesTable.module.css';

//TODO: Move to interface/type folder
export interface FormResponse {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	phone_type: string;
	address_id: string;
	is_black: boolean;
	is_local: boolean;
	has_flu_symptoms: boolean;
	household_members: number;
	feminine_health_care_id: string;
	item_requests: string;
	additional_information: string;
	is_pick_up: boolean;
	is_volunteering: boolean;
	is_subscribing: boolean;
	_is_interested_in_memberbership: boolean;
};

const mockData: FormResponse = {
  id: "1234",
  first_name: "Malcolm",
  last_name: "Moses",
  email: "malc@aol.com",
  phone_number: "555-5555",
  phone_type: "Mobile",
  address_id: "2133",
  is_black: true,
  is_local: true,
  has_flu_symptoms: false,
  household_members: 5,
  feminine_health_care_id: "yyyy",
  item_requests: "all",
  additional_information: "N/A",
  is_pick_up: false,
  is_volunteering: true,
  is_subscribing: true,
  _is_interested_in_memberbership: false,
};

const formResponseQuestions = [ "Name", "Phone Number", "Address", "Distribution Method", "COVID concern"];

const createTableColumn = (formResponseQuestions: string[]) => {
  return (
    formResponseQuestions.map(
      (string, id) => <th key={'questions' + id}>{string}</th>
    )
  );
};

const createTableData = (formResponses: FormResponse) => {
  return (
    Object.values(formResponses).map(
      (string, id) => <td key={'answers' + id}>{string}</td>
    )
  );
};

// Form Responses As Prop Arguments
// i.e. const ItemChecklistByRecipientAndBag = (props: FormResponse) => {
const FormResponsesTable = () => {
  return (
    <table style={{margin: "10em auto"}}>
      <tr>{createTableColumn(formResponseQuestions)}</tr>
      <tr>{createTableData(mockData)}</tr>
    </table>
  );
};

export { FormResponsesTable };