import InputProps from './InputProps';
import { useController } from 'react-hook-form';

const Input = ({ control, id, label, name, type = 'text' }: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...field} id={id} type={type} />
      {error?.message && <p>{error.message}</p>}
    </div>
  );
};

export default Input;
