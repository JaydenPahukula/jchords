import { InputHTMLAttributes, MouseEvent, useEffect, useRef } from 'react';
import { IconButton } from 'src/components/ui/iconbutton/iconbutton';
import { LockIcon } from 'src/components/ui/icons/lockicon';
import { XIcon } from 'src/components/ui/icons/xicon';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  xButton?: boolean;
  selectOnClick?: boolean;
}

export function TextField(props: TextFieldProps) {
  const ref = useRef<HTMLInputElement>(null);

  const { xButton, selectOnClick, className, ...inputProps } = props;

  function xOnMouseDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevent input element from losing focus
    if (ref.current) {
      ref.current.value = '';
      ref.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  useEffect(() => {
    const select = () => selectOnClick && ref.current?.select();
    ref.current?.addEventListener('click', select);
    return () => ref.current?.removeEventListener('click', select);
  }, [ref.current]);

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
