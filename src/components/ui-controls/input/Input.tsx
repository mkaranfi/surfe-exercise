import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  isInvalid?: boolean;
}

const Input = forwardRef(function Input(props: InputProps, ref: Ref<HTMLInputElement>) {
  const { isInvalid, ...inputProps } = props;

  return <input spellCheck ref={ref} {...inputProps} />;
});

export default Input;
