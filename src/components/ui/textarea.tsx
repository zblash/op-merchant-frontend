import React, { TextareaHTMLAttributes } from 'react';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
}

const UITextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className = 'block', labelKey, labelClassName, name, errorKey, placeholderKey, inputClassName, ...rest }, ref) => {
    return (
      <div className={`form-group ${className}`}>
        {labelKey && (
          <label className={labelClassName} htmlFor={name}>
            {labelKey}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholderKey}
          className={`form-control ${inputClassName}`}
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

export { UITextArea };
