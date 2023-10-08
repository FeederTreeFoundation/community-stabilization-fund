export interface UserDTO {
  id: number;
  name: string;
  api_keys?: ApiKeyDTO[];
}

export interface ApiKeyDTO {
  id: number;
  name: string;
  api_user_id?: number|null;
  api_user?: UserDTO;
  organization_id?: number|null;
  organization?: OrganizationDTO;
}

export interface OrganizationDTO {
  id: number;
  name: string;
  short_name?: string;
  bag_label_type?: string;
  api_keys?: ApiKeyDTO[];
  questions?: QuestionDTO[];
  checklist_rules?: ChecklistRuleDTO[];
  forms?: FormDTO[];
  disable_default_questions_json?: string|null;
  submitted_on?: Date|null;
  submitted_by?: string|null;
}

export interface MenstruatingHealthResponseDTO {
  id: number;
  menstruating_members: number;
  hygiene_items: string|string[]|null;
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

export interface FormDTO {
  id: number;
  name: string;
  organization_id: number;
  questions?: QuestionDTO[];
  form_responses?: FormResponseDTO[];
  submitted_on?: Date|null;
  submitted_by?: string|null;
  last_updated?: Date|null;
  last_updated_by?: string|null;
}

export interface FormQuestionDTO {
  id: number;
  question?: QuestionDTO;
  question_id?: number;
  form?: FormDTO;
  form_id?: number;
}

export interface FormResponseDTO {
  id: number;
  first_name: string;
  last_name: string;
  email?: string|null;
  phone_number?: string;
  phone_type?: string|null;
  address?: AddressDTO|null;
  race?: string|null;
  ethnicity?: string|null;
  is_local?: boolean;
  household_members?: number;
  has_flu_symptoms?: boolean;
  packages_to_receive?: string | string[];
  menstrual_health_care?: MenstruatingHealthResponseDTO|null;
  item_requests?: string|null;
  additional_information?: string|null;
  transport_preference?: string;
  is_volunteering?: boolean;
  is_subscribing?: boolean;
  is_joining?: boolean;
  is_interested_in_membership?: boolean;
  submitted_on?: Date|null;
  submitted_by?: string|null;
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
  package_group?: PackageGroupDTO;
  package_item?: PackageItemDTO;
  organization?: OrganizationDTO;
  package_group_id?: number;
  package_item_id?: number;
  organization_id?: number;
  submitted_on?: Date|null;
  submitted_by?: string|null;
  last_updated?: Date|null;
  last_updated_by?: string|null;
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
  form_questions?: FormQuestionDTO[];
  organization_id: number;
  submitted_on?: Date|null;
  submitted_by?: string|null;
  last_updated?: Date|null;
  last_updated_by?: string|null;
}
