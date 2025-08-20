import { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { XIcon } from 'src/components/icons/xicon';
import { Button } from 'src/components/ui/button';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  xButton?: boolean;
  rightIcon?: ReactNode;
}

export function TextField(props: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const { xButton, rightIcon, className, ...inputProps } = props;

  useEffect(() => {
    if (!xButton) return;
    const onFocusHandler = () => setFocused(true);
    const onBlurHandler = () => setFocused(false);
    ref.current?.addEventListener('focus', onFocusHandler);
    ref.current?.addEventListener('blur', onBlurHandler);
    return () => {
      ref.current?.removeEventListener('focus', onFocusHandler);
      ref.current?.removeEventListener('blur', onBlurHandler);
    };
  }, []);

  const xVisible = xButton && focused && inputProps.value !== '';

  function clear() {
    console.log('clear');
    if (ref.current !== null) {
      ref.current.value = '';
      ref.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  return (
    <div
      className={`border-gray-6 outline-gray-8 text-gray-11 flex items-center gap-2 rounded-md border-1 p-1 has-focus-within:outline-1 ${className}`}
      onClick={() => ref.current?.focus()}
    >
      <input
        ref={ref}
        className="text-gray-12 w-full shrink border-none px-2 py-1 outline-none"
        {...inputProps}
      />
      {xVisible && (
        <Button onClick={clear}>
          <XIcon />
        </Button>
      )}
      {rightIcon && <div className="shrink-0">{rightIcon}</div>}
    </div>
  );
}
