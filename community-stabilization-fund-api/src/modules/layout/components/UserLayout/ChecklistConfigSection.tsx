import { Button, Column } from "carbon-components-react";
import { useForm } from "react-hook-form";
import { BasicSelect } from "../../../../components";
import { ChecklistRule } from "../../../checklists";


interface ChecklistConfigSectionProps {
  handleOpen: (key: string) => void;
}

const ChecklistConfigSection = ({
  handleOpen
}: ChecklistConfigSectionProps) => {
  const {
    // watch,
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<ChecklistRule>();

  return (
    <Column className="mt-4">
      <Button kind={'primary'} size="lg" onClick={() => handleOpen('packageItemsModal')}>
        Configure Package Items
      </Button>
      <p className='mt-4'>
        <BasicSelect
          id='delay-dropdown'
          items={['Sheet Labels 4 x 2.5', 'Dymo Bag Label 2-5/16" x 4"']}
          noLabel
          defaultValue={'Sheet Labels 4 x 2.5'}
          defaultText='Select type of bag labels'
          onChange={console.log}
        />
      </p>
    </Column>
  )

};

export { ChecklistConfigSection }