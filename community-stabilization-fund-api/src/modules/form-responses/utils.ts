import { FormResponse } from "./FormResponsesTable";

export const mapBooleanToResponse = (response: any, question: string) => {
  const key = question.toLowerCase().replaceAll(" ", "_") as keyof FormResponse;
  if(typeof response[key] === "boolean") {
    response[key] = !!response[key] ? "Yes" : "No";
  }
};