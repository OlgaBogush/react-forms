import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, title, type, error, ...props }, ref) => {
    return (
      <div className="flex justify-between">
        <label htmlFor={id}>
          {title}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="h-12">
          <input
            ref={ref}
            className="min-w-64 h-8 px-2 rounded shadow"
            type={type}
            id={id}
            placeholder={`Enter Your ${title}`}
            {...props}
          />
          {error && <p className="text-red-500 text-[12px]">{error}</p>}
        </div>
      </div>
    );
  }
);

InputField.displayName = 'InputField';
