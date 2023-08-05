import { FormResponse } from "../../../../db";
import { BAG_LABEL_TYPES } from "../../constants";
import { ItemChecklistByBag } from "./ItemChecklistByBag";
import { ItemChecklistByRecipient } from "./ItemChecklistByRecipient";

interface ItemChecklistProps {
  formResponses: FormResponse[];
  bagLabelType?: string;
}

const ItemChecklist = ({ formResponses, bagLabelType, }: ItemChecklistProps) => {
  if (
    bagLabelType === BAG_LABEL_TYPES.DYMO_LABELS.OPTION_ONE 
  ) {
    return (
      <>
        {formResponses?.map((formResponse) => (
          <>
            <ItemChecklistByBag formResponse={formResponse} bagLabelType={bagLabelType} />
          </>
        ))}
      </>
    );
  }
  
  return (
    <>
      {formResponses.map((formResponse) => (
        <>
          <ItemChecklistByRecipient formResponse={formResponse} />
          <ItemChecklistByBag formResponse={formResponse} bagLabelType={bagLabelType} />
        </>
      ))}
    </>
  );
};

export { ItemChecklist };