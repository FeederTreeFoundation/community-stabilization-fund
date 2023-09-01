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
  api_users?: UserDTO[];
  questions?: QuestionDTO[];
  checklist_rules?: ChecklistRuleDTO[];
  forms?: FormDTO[];
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
  phone_number?: string;
  phone_type?: string|null;
  address?: AddressDTO|null;
  is_black?: boolean;
  is_local?: boolean;
  household_members?: number;
  has_flu_symptoms?: boolean;
  packages_to_receive?: string | string[];
  feminine_health_care?: FeminineHealthResponseDTO|null;
  item_requests?: string|null;
  additional_information?: string|null;
  is_pick_up?: boolean;
  is_volunteering?: boolean;
  is_subscribing?: boolean;
  is_joining?: boolean;
  is_interested_in_membership?: boolean;
  submitted_on?: Date|null;
  submitted_by?: string|null;
  live_in_pittsburgh_atlanta?: boolean;
  live_in_southside_atlanta?: boolean;
  elderly_members?: number|null;
  youth_members?: number|null;
  custom_question_responses?: string|null;
  answers?: AnswerDTO[];
  form_id?: number|null;
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
  id: number;
  quantity: string;
  household_members: string;
  bag_label_type: string;
  delayed_until?: Date | null;
  days_delayed_by?: number | null;
  weeks_delayed_by?: number | null;
  package_item_id: number;
  package_group_id: number;
  organization_id: number;
  submitted_on?: Date|null;
  submitted_by?: string|null;
}

export interface AnswerDTO {
  id: number;
  text: string;
  question_id: number;
  form_response_id?: number;
}

export interface QuestionDTO {
  id: number;
  text: string;
  type: string;
  hidden: boolean;
  required: boolean;
  role?: string;
  options?: string;
  helper_text?: string;
  answers?: AnswerDTO[];
  organization_id: number;
  form_id?: number;
  submitted_on?: Date|null;
}

export interface FormDTO {
  id: number;
  name: string;
  organization_id: number;
  questions?: QuestionDTO[];
  form_responses?: FormResponseDTO[];
}
