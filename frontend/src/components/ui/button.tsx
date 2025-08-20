import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  const { children, className, ...buttonProps } = props;
  return (
    <button
      className={`hover:bg-gray-3 active:bg-gray-4 flex h-8 min-w-8 flex-row items-center justify-center rounded-md p-1 ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
