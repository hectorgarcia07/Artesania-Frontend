import { Button  } from "@mui/material"
import { FieldArray } from "formik"
import { ShoeData } from "../../../types"
import CustomInput from './CustomInput'
import ConfirmDeleteModal from '../../ConfirmDeleteModal'

interface CustomFieldArrayProps {
  values: ShoeData;
  name: string;
}

const CustomFieldArray = (props:CustomFieldArrayProps) => {
  return (
    <FieldArray name={props.name}>
      {({ push, remove }) => (
        <div>
          {props.values.sizes.map((size, index) => {
            return (
              <div key={index}>
                <CustomInput
                  label="Size"
                  name={`sizes[${index}].size`}
                  type="number"
                />
                <CustomInput
                  label="Quantity"
                  name={`sizes[${index}].quantity`}
                  type="number"
                />
                <ConfirmDeleteModal onClickMethod={ () => remove(index) } description="Delete Size" />
              </div>
            )
          })}
          <Button
            type="button"
            onClick={() =>
              push({ size: "", quantity: "" })
            }
          >
            add to list
          </Button>
        </div>
      )}
    </FieldArray>
  )
}

export default CustomFieldArray