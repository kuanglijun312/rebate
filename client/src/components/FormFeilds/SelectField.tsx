import type { IFormField } from "../../interface/form"

export const SelectField = ({
  field,
  value,
  onChange,
}: {
  field: IFormField,
  value: string,
  onChange: (value: string) => void,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      id={field.name}
      name={field.name}
      value={value}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {field.options?.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}