import { getAddress } from '../../form-responses';

import type { FormResponse } from '../../../db';
import type { BagItemsMap } from '../types';

export const mapFormResponseToRecipientInfo = (formResponse: FormResponse) => {
  const {
    first_name,
    last_name,
    phone_number,
    address_id,
    is_pick_up,
    has_flu_symptoms,
    household_members,
  } = formResponse;

  const address = getAddress(formResponse);

  return [
    `${first_name} ${last_name}`,
    phone_number,
    address,
    `${is_pick_up ? "Pick Up" : "Drop Off"}`,
    `${has_flu_symptoms ? "Yes" : "No"}`,
    household_members
  ];
};

export const mapFormResponseToBagItems = ({
  household_members = 0,
  feminine_health_care_id,
}: FormResponse) =>
  ({
    Groceries: [
      { name: 'Chicken', quantity: household_members <= 3 ? 1 : 2 },
      { name: 'Eggs', quantity: household_members <= 3 ? 1 : 2 },
      { name: 'Cereal', quantity: 1 },
      { name: 'Bread', quantity: household_members <= 3 ? 1 : 2 },
      { name: 'Canned Green Beans', quantity: household_members <= 3 ? 2 : 4 },
      {
        name: 'Canned Green Beans(baked/black)',
        quantity: household_members <= 3 ? 2 : 4,
      },
      { name: 'Assorted Fruit 1', quantity: household_members <= 3 ? 4 : 8 },
      { name: 'Assorted Fruit 2', quantity: household_members <= 3 ? 4 : 8 },
      {
        name: 'Vegetable Assortment',
        quantity: household_members <= 3 ? 4 : 8,
      },
    ],
    'General Hygiene': [
      { name: 'Deodorant', quantity: household_members },
      { name: 'Body Soap', quantity: household_members },
      { name: 'Toilet Paper(Rolls)', quantity: household_members },
      { name: 'Toothbrush', quantity: household_members },
      { name: 'Toothpaste', quantity: household_members <= 3 ? 1 : 2 },
    ],
    'Cleaning/Health Supplies': [
      { name: 'All Purpose Cleaner', quantity: 1 },
      { name: 'Cleaning Wipes(Packs)', quantity: 1 },
      { name: 'Hand Sanitizer', quantity: household_members },
      { name: 'Tylenol', quantity: household_members },
      { name: 'Paper Towel', quantity: household_members <= 6 ? 1 : 2 },
      { name: 'Dish Washing Soap', quantity: 1 },
      { name: 'Packs of Face Mask', quantity: 1 },
    ],
    'Feminine Hygiene': [
      { name: 'Feminine Wipes', quantity: feminine_health_care_id ? 15 : 0 },
      { name: 'Regular Tampons', quantity: feminine_health_care_id ? 15 : 0 },
      { name: 'Super Tampons', quantity: feminine_health_care_id ? 15 : 0 },
      { name: 'Thin Pads', quantity: feminine_health_care_id ? 15 : 0 },
      { name: 'Regular Pads', quantity: feminine_health_care_id ? 15 : 0 },
    ],
  } as BagItemsMap);

export const createBagItems = (label: string, bagItemsMap: BagItemsMap) => bagItemsMap[label].map((item) => `${item.name} (x${item.quantity})`);
