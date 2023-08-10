import type { ChecklistRuleDTO, FormResponseDTO } from '../../../db';
import type { BagItemsMap } from '../types';

import { addDays, addWeeks, compareDates, isEmpty } from '../../../utils';
import { getAddress } from '../../form-responses';

export const mapFormResponseToRecipientInfo = (formResponse: FormResponseDTO) => {
  const {
    first_name,
    last_name,
    phone_number,
    is_pick_up,
    has_flu_symptoms,
    household_members,
    feminine_health_care,
  } = formResponse;

  const address = getAddress(formResponse);

  return [
    `${first_name} ${last_name}`,
    ` ${household_members}`,
    phone_number,
    address,
    `${is_pick_up ? "Pick Up" : "Drop Off"}`,
    `${has_flu_symptoms ? "Yes" : "No"}`,
    household_members,
    feminine_health_care?.feminine_members
  ];
};

export const mapFormResponseToBagItems = ({
  feminine_health_care,
  household_members = 0,
}: FormResponseDTO) => {
  let bagItemsMap = createInitialBagItemsMap({
    household_members,
    feminine_health_care,
  } as FormResponseDTO);

  if (feminine_health_care?.needs_plan_b) {
    bagItemsMap['Feminine Hygiene'] = [
      ...bagItemsMap['Feminine Hygiene'],
      { name: 'Plan B', quantity: 1 },
    ];
  }

  return bagItemsMap;
};

export const createInitialBagItemsMap = ({
  household_members,
  feminine_health_care,
}: FormResponseDTO) =>
  ({
    Groceries: [
      { name: 'Chicken', quantity: household_members <= 3 ? 1 : 2 },
      { name: 'Eggs', quantity: household_members <= 3 ? 1 : 2 },
      { name: 'Cereal', quantity: 1 },
      { name: 'Bread', quantity: household_members <= 3 ? 1 : 2 },
      { name: 'Canned Green Beans', quantity: household_members <= 3 ? 2 : 4 },
      {
        name: 'Canned Beans (baked/black)',
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
      { name: 'Feminine Wipes', quantity: feminine_health_care ? 15 : 0 },
      { name: 'Regular Tampons', quantity: feminine_health_care ? 15 : 0 },
      { name: 'Super Tampons', quantity: feminine_health_care ? 15 : 0 },
      { name: 'Thin Pads', quantity: feminine_health_care ? 15 : 0 },
      { name: 'Regular Pads', quantity: feminine_health_care ? 15 : 0 },
    ],
  } as BagItemsMap);

export const createDefaultBagItems = (
  label: string,
  bagItemsMap: BagItemsMap
) => bagItemsMap[label].map((item) => `${item.name} (x${item.quantity})`);

export const createBagItems = (
  label: string,
  bagItemsMap: BagItemsMap,
  rules: ChecklistRuleDTO[],
  formResponse: FormResponseDTO
) => {
  const { household_members, feminine_health_care, submitted_on } =
    formResponse;
  const feminine_members = feminine_health_care
    ? feminine_health_care.feminine_members
    : null;

  if (isEmpty(rules)) return createDefaultBagItems(label, bagItemsMap);

  return bagItemsMap[label]
    .map((item) => {
      const found = rules.find(
        (rule) =>
          rule.package_group.name === `${label}` &&
          rule.package_item.name === `${item.name}` &&
          rule.household_members ===
            `${label === 'Feminine Hygiene' ? feminine_members : household_members}`
      );

      if (found && !validateItemByDate(found))
        return '';

      return found
        ? `${item.name} (x${found.quantity})`
        : `${item.name} (x${item.quantity})`;
    })
    .filter((x) => !isEmpty(x));
};

export const validateItemByDate = (
  rule: ChecklistRuleDTO
) => {
  let delayUntil = null;

  if (rule) {
    if (rule.days_delayed_by) {
      delayUntil = addDays(
        rule?.submitted_on ?? new Date(),
        parseInt(`${rule.days_delayed_by}`)
      );
    }
    if (rule.weeks_delayed_by) {
      delayUntil = addWeeks(
        rule?.submitted_on ?? new Date(),
        parseInt(`${rule.weeks_delayed_by}`)
      );
    }
  }

  if (delayUntil) return compareDates('before', new Date(), delayUntil);
  return true;
};
