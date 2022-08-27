import { Button, Input } from "@mui/material"
import { Field, FieldArray } from "formik"

const CustomFieldArray = () => {

  return (
    <FieldArray name="people">
      {({ push, remove }) => (
        <div>
          {values.people.map((p, index) => {
            return (
              <div key={p.id}>
                <Field
                  name={`people[${index}].firstName`}
                  component={Input}
                />
                <Field
                  name={`people[${index}].lastName`}
                  component={Input}
                />
                <div onClick={() => remove(index)}>x</div>
              </div>
            )
          })}
      <Button
        type="button"
        onClick={() =>
          push({ id: generate(), firstName: "", lastName: "" })
        }
      >
        add to list
      </Button>
    </div>
  )}
  </FieldArray>
)
}