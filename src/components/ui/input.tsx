import * as React from 'react';
import styled, { StylableProps } from '~/styled';

/*
  UIInput Helpers
*/
interface UIInputProps extends StylableProps {
  id: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  inputClassName?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  value?: string | number;
  disabled?: boolean;
  form?: string;
  setRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  name?: string;
  step?: string;
  readOnly?: boolean;
  maxlength?: string;
  pattern?: string;
}

/*
  UIInput Styles
*/

const StyledUIInputWrapper = styled.div<{ disabled?: boolean }>`
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  display: flex;
  border-radius: 4px;
`;
const Input = styled.input`
  border: none;
  background-image: none !important;
  background-color: transparent !important ;
  box-shadow: none;
  outline: none;
  width: 100%;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const _UIInput: React.SFC<UIInputProps> = props => {
  const __ = (
    <StyledUIInputWrapper className={props.className} disabled={props.disabled}>
      {props.leftIcon && <StyledLabel htmlFor={props.id}>{props.leftIcon}</StyledLabel>}
      <Input
        step={props.step}
        ref={props.setRef}
        name={props.name}
        form={props.form}
        value={props.value}
        type={props.type}
        disabled={props.disabled}
        id={props.id}
        required={props.required}
        className={props.inputClassName}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        pattern={props.pattern}
        onChange={e => props.onChange && props.onChange(e.target.value)}
      />
      {props.rightIcon && <StyledLabel htmlFor={props.id}>{props.rightIcon}</StyledLabel>}
    </StyledUIInputWrapper>
  );

  return __;
};

const UIInput = React.memo(_UIInput);

export { UIInput };
