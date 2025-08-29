import { InputHTMLAttributes, MouseEvent, useEffect, useRef } from 'react';
import { IconButton } from 'src/components/ui/iconbutton/iconbutton';
import { LockIcon } from 'src/components/ui/icons/lockicon';
import { MagnifyingGlassIcon } from 'src/components/ui/icons/magnifyingglassicon';
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
    <div
      data-readonly={inputProps.readOnly || undefined}
      className={`my-text-field group ${className}`}
      onClick={() => ref.current?.focus()}
    >
      {inputProps.type === 'search' && <MagnifyingGlassIcon className="m-2 mr-1 size-4" />}
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
          className="ml-1 group-not-has-focus:hidden"
        >
          <XIcon />
        </IconButton>
      )}
      {inputProps.type === 'password' && <LockIcon className="mx-2" />}
    </div>
  );
}
