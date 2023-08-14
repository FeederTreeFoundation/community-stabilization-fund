export interface UserDTO {
  id: number;
  name: string;
  organization_id?: number|null;
}

export interface OrganizationDTO {
  id: number;
  name: string;
  short_name?: string;
  bag_label_type?: string;
  api_users: UserDTO[];
}

export interface FeminineHealthResponseDTO {
  id: number;
  feminine_members: number;
  hygiene_items: string|null;
  needs_plan_b?: boolean;
}

export interface AddressDTO {
  id: number;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  line1: string;
  line2?: string|null;
}

export interface FormResponseDTO {
  id: number;
  first_name: string;
  last_name: string;
  email?: string|null;
  phone_number: string;
  phone_type?: string|null;
  address: AddressDTO|null;
  is_black: boolean;
  is_local: boolean;
  household_members: number;
  has_flu_symptoms: boolean;
  packages_to_receive: string | string[];
  feminine_health_care: FeminineHealthResponseDTO|null;
  item_requests?: string|null;
  additional_information?: string|null;
  is_pick_up: boolean;
  is_volunteering: boolean;
  is_subscribing: boolean;
  is_joining: boolean;
  is_interested_in_membership: boolean;
  submitted_on?: Date|null;
  live_in_pittsburgh_atlanta?: boolean;
  live_in_southside_atlanta?: boolean;
  elderly_members?: number|null;
  youth_members?: number|null;
}

export interface PackageGroupDTO {
  id: number;
  name: string;
}

export interface PackageItemDTO {
  id: number;
  name: string;
}

export interface ChecklistRuleDTO {
  id?: number;
  quantity: string;
  household_members: string;
  bag_label_type: string;
  delayed_until?: Date | null;
  days_delayed_by?: number | null;
  weeks_delayed_by?: number | null;
  package_item: PackageItemDTO;
  package_group: PackageGroupDTO;
  submitted_on?: Date|null;
}

