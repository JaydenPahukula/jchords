import { ComponentChild } from 'preact';
import { JSX } from 'preact/jsx-runtime';
import XIcon from '../icons/xicon';

interface FormInputProps extends JSX.InputHTMLAttributes {
  icon?: ComponentChild;
  onXClicked?: () => void;
}

export default function FormInput(props: FormInputProps) {
  const { icon, onXClicked, class: c, ...inputProps } = props;
  return (
    <div class="border-b-fg-2 has-focus:border-b-fg-0 mb-8 flex w-full items-center border-b-1 border-solid has-focus:border-b-[1.5px]">
      <input {...inputProps} class={c + ' peer flex-grow p-0.5 outline-none'} />
      <div
        onMouseDown={props.onXClicked}
        class="hover:bg-bg-button hidden h-7 w-7 rounded-sm p-1 peer-focus:not-peer-placeholder-shown:block"
      >
        <XIcon />
      </div>
      {icon && <div class="not-peer-focus:text-fg-1 h-7 w-7 p-1">{icon}</div>}
    </div>
  );
}
