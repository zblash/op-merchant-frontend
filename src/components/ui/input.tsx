import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
}

const UIInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = 'block',
      labelKey,
      labelClassName,
      name,
      errorKey,
      placeholderKey,
      variant = 'normal',
      shadow = false,
      type = 'text',
      inputClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={`form-group ${className || ''}`}>
        {labelKey && (
          <label className={labelClassName} htmlFor={name}>
            {labelKey}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholderKey}
          className={`form-control border ${inputClassName || ''}`}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={errorKey ? 'true' : 'false'}
          {...rest}
        />
        {errorKey && (
          <div id={`${name}Feedback`} className="invalid-feedback d-block">
            {errorKey}
          </div>
        )}
      </div>
    );
  },
);

export { UIInput };
