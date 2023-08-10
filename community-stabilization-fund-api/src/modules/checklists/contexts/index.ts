import { createContext } from 'react';

import type { ChecklistRuleDTO } from '../../../db';

interface ChecklistsRulesContextProps {
  rules: ChecklistRuleDTO[];
  updateRules?: Function;
  bagLabelType?: string;
  updateBagLabelType?: Function;
}

export const ChecklistsRulesContext =
  createContext<ChecklistsRulesContextProps>({ rules: [], bagLabelType: '' });
