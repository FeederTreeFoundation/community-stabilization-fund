export interface FormResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_type: string;
  address_id?: number;
  is_black?: boolean;
  is_local?: boolean;
  household_members?: number;
  has_flu_symptoms?: boolean;
  packages_to_receive?: string[];
  feminine_health_care_id?: number;
  item_requests?: string;
  additional_information?: string;
  is_pick_up?: boolean;
  is_volunteering?: boolean;
  is_subscribing?: boolean;
  is_joining?: boolean;
  address_city?: string,
  address_country?: string,
  address_line1?: string,
  address_line2?: string,
  address_state?: string,
  address_zip: string,
};

export interface User {
  id: number;
  name: string;
}
