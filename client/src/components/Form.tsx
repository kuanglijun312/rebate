import { useState } from "react";
import type { IFormField } from "../interface/form";
import clsx from "clsx";
import { FormField } from "./FormField";

export const Form = ({
  className,
  fields,
  actionName,
  initialValues,
  onSubmit,
}: {
  className?: string,
  fields: IFormField[],
  actionName: string
  initialValues?: Record<string, string>,
  onSubmit: (values: Record<string, string>) => void,
}) => {
  const [values, setValues] = useState<Record<string, string>>(initialValues || {});

  const handleChange = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(values);
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(className)}>
      {
        fields.map((field, index) => {
          return (
            <FormField
              key={index}
              className="mb-4"
              fieldProps={{
                field,
                value: values[field.name],
                onChange: (value: string) => handleChange(field.name, value),
              }}
            />
          )
        })
      }
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        {actionName}
      </button>
    </form>
  );
}