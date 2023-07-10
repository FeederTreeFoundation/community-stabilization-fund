import { createContext } from "react";

export interface ChecklistRule {
  householdMembers?: string;
  itemQuantity?: string;
  packageItem?: string;
  packageGroup?: string;
  delayedBy?: {
    days?: number;
    weeks?: number;
  };
}

interface ChecklistsRulesContextProps {
  rules: ChecklistRule[],
  updateRules?: Function
}

export const ChecklistsRulesContext = createContext<ChecklistsRulesContextProps>({ rules: [] });