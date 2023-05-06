export interface User {
  id: number;
  name: string;
}

export interface FeminineHealthResponse {
  id: number;
  feminine_members: number;
  hygiene_items: string|null;
  plan_b?: boolean;
}

export interface Address {
  id: number;
  city: string;
  state: string;
  zipcode: number;
  line1: string;
  line2: string|null;
}

export interface FormResponse {
  id: number;
  first_name: string;
  last_name: string;
  email?: string|null;
  phone_number: string;
  phone_type?: string|null;
  address: Address|null;
  is_black: boolean;
  is_local: boolean;
  household_members?: number|null;
  has_flu_symptoms: boolean;
  packages_to_receive: string | string[];
  feminine_health_care: FeminineHealthResponse|null;
  item_requests?: string|null;
  additional_information?: string|null;
  is_pick_up: boolean;
  is_volunteering: boolean;
  is_subscribing: boolean;
  is_joining: boolean;
  is_interested_in_membership: boolean;
  submitted_on?: string|null;
  live_in_pittsburgh_atlanta?: boolean;
  live_in_southside_atlanta?: boolean;
  elderly_members?: number|null;
  youth_members?: number|null;
}

