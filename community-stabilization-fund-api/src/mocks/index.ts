import { FormResponse, GroceryItemProps } from "../modules/checklists";

export const formResponseMock: FormResponse = {
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

export const groceryItemsMock = {
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
  ]
};