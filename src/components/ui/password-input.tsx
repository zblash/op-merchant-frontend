import React, { InputHTMLAttributes, useState } from 'react';
import { EyeOff } from '@/components/icons/eye-off-icon';
import { Eye } from '@/components/icons/eye-icon';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelKey: string;
  name: string;
  shadow?: boolean;
  errorKey: string | undefined;
}

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className = 'block', inputClassName, labelKey, name, errorKey, shadow = false, ...rest }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className={`form-group ${className}`}>
        {labelKey && <label htmlFor={name}>{labelKey}</label>}
        <div className="position-relative">
          <input
            id={name}
            name={name}
            type={show ? 'text' : 'password'}
            ref={ref}
            className="form-control"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          {show ? (
            <EyeOff
              onClick={() => {
                setShow(false);
              }}
              className="h-50 login-page__eye-icon position-absolute"
            />
          ) : (
            <Eye
              onClick={() => {
                setShow(true);
              }}
              className="h-50 login-page__eye-icon position-absolute"
            />
          )}
        </div>
        {errorKey && (
          <div id={`${name}Feedback`} className="invalid-feedback d-block">
            {errorKey}
          </div>
        )}
      </div>
    );
  },
);

export default PasswordInput;
