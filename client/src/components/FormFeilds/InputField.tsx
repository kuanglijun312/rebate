import type { IFormFieldProps } from "../../interface/form";

export const InputField = ({
  field,
  value,
  onChange,
}: IFormFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={field.type}
      id={field.name}
      value={value}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}