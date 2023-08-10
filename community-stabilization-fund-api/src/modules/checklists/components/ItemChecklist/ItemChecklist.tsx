import type { FormResponseDTO } from "../../../../db";

import { ItemChecklistByBag } from "./ItemChecklistByBag";
import { ItemChecklistByRecipient } from "./ItemChecklistByRecipient";
import { BAG_LABEL_TYPES } from "../../constants";

interface ItemChecklistProps {
  formResponses: FormResponseDTO[];
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