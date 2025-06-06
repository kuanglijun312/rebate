import clsx from "clsx";
import { FormTypeEnums, type IFormFieldProps } from "../interface/form";
import { useMemo } from "react";
import { SelectField } from "./FormFeilds/SelectField";
import { InputField } from "./FormFeilds/InputField";

export const FormField = ({
  fieldProps,
  className,
}: {
  fieldProps: IFormFieldProps
  className?: string,
}) => {
  const fieldContent = useMemo(() => {
    switch (fieldProps.field.type) {
      case FormTypeEnums.Select:
        return (
          <SelectField
            field={fieldProps.field}
            value={fieldProps.value}
            onChange={fieldProps.onChange}
          />
        );
      case FormTypeEnums.Text:
        return (
          <InputField
            field={fieldProps.field}
            value={fieldProps.value}
            onChange={fieldProps.onChange}
          />
        );
      default:
        return (
          <InputField
            field={fieldProps.field}
            value={fieldProps.value}
            onChange={fieldProps.onChange}
          />
        );;
    }
  }, [fieldProps])
  return (
    <div className={clsx('flex', className)}>
      <label className="w-full flex flex-col">
        <span className=" text-gray-700 mb-2">
        {fieldProps.field.label}
        </span>
        <div className="flex-1">
          {fieldContent}
        </div>
      </label>
    </div>
  );
}