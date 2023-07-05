import { createContext } from "react";

export interface ChecklistRule {
  householdMembers?: string;
  itemQuantity?: string;
  packageItem?: string;
  packageGroup?: string;
}

interface ChecklistsRulesContextProps {
  rules: ChecklistRule[], 
  updateRules?: Function
}

export const ChecklistsRulesContext = createContext<ChecklistsRulesContextProps>({ rules: [] });