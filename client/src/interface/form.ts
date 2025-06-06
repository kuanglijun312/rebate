
export enum FormTypeEnums {
  Text = 'text',
  Password = 'password',
  Select = 'select',
}

interface IFormFieldOption {
  value: string
  label: string
}

export interface IFormField {
  name: string
  label: string
  type: FormTypeEnums
  inputType?: string
  options?: IFormFieldOption[]
}

export interface IFormFieldProps {
  field: IFormField,
  value: string,
  onChange: (value: string) => void,
}