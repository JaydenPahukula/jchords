import { ButtonHTMLAttributes } from 'react';
import LoadingSpinner from 'src/components/ui/loadingspinner';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'subtle';
  loading?: boolean;
}

export interface ButtonProps
  extends CustomButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CustomButtonProps> {}

export function Button({ variant = 'primary', loading, children, ...buttonProps }: ButtonProps) {
  return (
    <button
      tabIndex={0}
      {...buttonProps}
      className={`my-button my-button-${variant} ${buttonProps.className}`}
      disabled={buttonProps.disabled || loading}
    >
      <div
        className={`relative flex flex-row items-center justify-center gap-2 ${loading && 'invisible'}`}
      >
        {children}
        {loading && (
          <div className="visible absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </button>
  );
}
