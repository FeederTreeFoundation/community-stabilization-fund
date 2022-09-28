import React from "react";

import { FORM_RESPONSE_QUESTIONS } from "./constants";
import { DataTableHeader, DataTableRow } from "carbon-components-react/lib/components/DataTable";
import { mapBooleanToResponse } from "./utils";

import { BasicTable } from "../../components";

import { formResponseMock } from "../../mocks";
// import styles from './styles/FormResponsesTable.module.css';

//TODO: Move to interface/type folder
export interface FormResponse {
	id: string;
  submitted_on: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	phone_type: string;
	address_id: string;
	is_black: boolean;
	live_in_pittsburgh_atlanta: boolean;
  live_in_southside_atlanta: boolean;
	has_flu_symptoms: boolean;
	household_members: number;
	feminine_health_care_id: string;
	packages_like_to_receive: string;
	additional_information: string;
	is_pick_up: boolean;
	is_volunteering: boolean;
	is_subscribing: boolean;
	is_interested_in_memberbership: boolean;
};

const mockData: FormResponse = {
  id: "1234",
  submitted_on: "03/04/2022 3:44 pm",
  first_name: "Malcolm",
  last_name: "Moses",
  email: "malc@aol.com",
  phone_number: "555-5555",
  phone_type: "Mobile",
  address_id: "2133",
  is_black: true,
  live_in_pittsburgh_atlanta: false,
  live_in_southside_atlanta: true,
  has_flu_symptoms: false,
  household_members: 5,
  feminine_health_care_id: "yyyy",
  packages_like_to_receive: "all",
  additional_information: "N/A",
  is_pick_up: false,
  is_volunteering: true,
  is_subscribing: true,
  is_interested_in_memberbership: false,
};

interface FormResponsesTableProps {
  formResponses?: FormResponse[];
}

const FormResponsesTable = ({formResponses = [mockData]}: FormResponsesTableProps) => {
  const createHeaders = (formResponseQuestions: string[]) => {
    return formResponseQuestions.map(
      (header: string) => ({key: header.toLowerCase().replaceAll(" ", "_"), header})
    );
  };
  
  const createRows = (formResponses: FormResponse[]) => {
    return formResponses.map(resp => {
      const feminine_health_care = !!resp.feminine_health_care_id;
      const r = {...resp, feminine_health_care};
  
      FORM_RESPONSE_QUESTIONS.forEach(q => mapBooleanToResponse(r, q));
      return r;
    });
  };

  const rows = createRows(formResponses) as DataTableRow<string>[];
  const headers = createHeaders(FORM_RESPONSE_QUESTIONS) as DataTableHeader<string>[];

  return (
    <div style={{margin: "10em auto"}}>
      <BasicTable rows={rows} headers={headers} />
    </div>
  );
};

export { FormResponsesTable };