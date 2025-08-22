import { InputHTMLAttributes, MouseEvent, useRef } from 'react';
import { IconButton } from 'src/components/ui/iconbutton';
import { LockIcon } from 'src/components/ui/icons/lockicon';
import { XIcon } from 'src/components/ui/icons/xicon';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  xButton?: boolean;
}

export function TextField(props: TextFieldProps) {
  const ref = useRef<HTMLInputElement>(null);

  const { xButton, className, ...inputProps } = props;

  function xOnMouseDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevent input from losing focus
    if (ref.current) {
      ref.current.value = '';
      ref.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  return (
    <div className={`my-text-field group ${className}`} onClick={() => ref.current?.focus()}>
      <input
        ref={ref}
        tabIndex={0}
        className="w-full shrink border-none p-1 pl-2 outline-none"
        {...inputProps}
      />
      {xButton && (
        <IconButton
          tabIndex={-1}
          variant="subtle"
          onMouseDown={xOnMouseDown}
          icon={XIcon}
          className={'group-not-has-focus:hidden'}
        />
      )}
      {inputProps.type === 'password' && <LockIcon className="mx-2" />}
    </div>
  );
}
