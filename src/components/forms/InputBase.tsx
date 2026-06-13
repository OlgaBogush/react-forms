import type { InputHTMLAttributes } from 'react';

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
}

export const InputBase = ({ title, error, ...props }: InputBaseProps) => {
  return (
    <div className="flex justify-between">
      <label htmlFor={props.id}>
        {title}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="h-12">
        <input
          className="min-w-64 h-8 px-2 rounded shadow"
          placeholder={`Enter Your ${title}`}
          {...props}
        />
        {error && <p className="text-red-500 text-[12px]">{error}</p>}
      </div>
    </div>
  );
};
