import { ReadonlySignal } from '@preact/signals-react';
import { ReactNode } from 'react';
import { LoadingSpinner } from 'shared/components/loadingspinner/loadingspinner';

interface FormButtonProps {
  children?: ReactNode;
  disabled?: ReadonlySignal<boolean>;
  loading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export function FormButton(props: FormButtonProps) {
  return (
    <button
      disabled={props.disabled?.value || props.loading}
      onClick={props.onClick}
      className="bg-bg-button enabled:hover:bg-bg-button-hover enabled:active:bg-bg-button-active flex h-11 w-full flex-col items-center justify-center rounded-full enabled:cursor-pointer"
    >
      {props.icon && <div className="fixed h-11 w-11 self-start p-3">{props.icon}</div>}
      {props.loading ? (
        <div className="text-fg-0 w-6">
          <LoadingSpinner />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
}
