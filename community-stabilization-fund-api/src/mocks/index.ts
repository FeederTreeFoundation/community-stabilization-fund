import type { FormResponseDTO } from "../db";

export const formResponseMock: FormResponseDTO =  {
  is_joining: false,
  is_local: false,
  id: 1234,
  submitted_on: null,
  first_name: "Malcolm",
  last_name: "Moses",
  email: "malc@aol.com",
  phone_number: "555-5555",
  phone_type: "Mobile",
  address: null,
  race: "Black or African",
  ethnicity: "Hispanic or Latino",
  has_flu_symptoms: false,
  household_members: 5,
  menstrual_health_care: null,
  packages_to_receive: ["all"],
  additional_information: "N/A",
  transport_preference: "Pick Up",
  is_volunteering: true,
  is_subscribing: true,
  is_interested_in_membership: false
};

export const bagItemsMock = {
  "Groceries": [
    { name: "Chicken", quantity: 1 },
    { name: "Eggs", quantity: 2 },
    { name: "Bread", quantity: 2 }
  ],
  "General Hygiene": [
    { name: "Deodorant", quantity: 2 },
    { name: "Body Soap", quantity: 2 },
    { name: "Toilet Paper", quantity: 2 },
    { name: "Toothbrush" , quantity: 2 },
    { name: "Toothpaste" , quantity: 1 }
  ],
  "Menstrual Hygiene": [
    { name: "Menstrual Wipes", quantity: 5 },
    { name: "Regular Tampons", quantity: 15 },
    { name: "Super Tampons", quantity: 15 },
    { name: "Thin Pads", quantity: 15 },
    { name: "Regular Pads", quantity: 15 }
  ]
};