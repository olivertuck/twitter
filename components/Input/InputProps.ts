import { InputType } from '../../types';
import { UseControllerProps } from 'react-hook-form';

type InputProps = UseControllerProps<any> & {
  label: string;
  id: string;
  type?: InputType;
};

export default InputProps;
