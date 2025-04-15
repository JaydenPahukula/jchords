import { ReadonlySignal } from '@preact/signals';
import { ComponentChild, ComponentChildren } from 'preact';
import LoadingSpinner from 'shared/components/loadingspinner/loadingspinner';

interface FormButtonProps {
  children?: ComponentChildren;
  disabled?: boolean | ReadonlySignal<boolean>;
  loading?: boolean;
  icon?: ComponentChild;
  onClick?: () => void;
}

export default function FormButton(props: FormButtonProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      class="bg-bg-button enabled:hover:bg-bg-button-hover enabled:active:bg-bg-button-active flex h-11 w-full flex-col items-center justify-center rounded-full enabled:cursor-pointer"
    >
      {props.icon && <div class="fixed h-11 w-11 self-start p-3">{props.icon}</div>}
      {props.loading ? (
        <div class="text-fg-0 w-6">
          <LoadingSpinner />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
}
