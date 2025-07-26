import { useSignal } from '@preact/signals-react';
import { InputHTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { XIcon } from 'src/components/icons/xicon';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  xButton?: boolean;
  leftIcons?: ReactNode[];
  rightIcons?: ReactNode[];
}

export function TextField(props: TextFieldProps) {
  const focused = useSignal(false);
  const ref = useRef<HTMLInputElement>(null);

  const { xButton, leftIcons, rightIcons, className, ...inputProps } = props;

  useEffect(() => {
    if (!xButton) return;
    const onFocusHandler = () => (focused.value = true);
    const onBlurHandler = () => (focused.value = false);
    ref.current?.addEventListener('focus', onFocusHandler);
    ref.current?.addEventListener('blur', onBlurHandler);
    return () => {
      ref.current?.removeEventListener('focus', onFocusHandler);
      ref.current?.removeEventListener('blur', onBlurHandler);
    };
  }, []);

  const xVisible = focused.value && inputProps.value !== '';

  return (
    <div
      className="border-gray-6 outline-gray-8 text-gray-11 flex items-center gap-2 rounded-md border-1 px-2 py-1 has-focus-within:outline-1"
      onClick={() => ref.current?.focus()}
    >
      {...leftIcons ?? []}
      <input
        ref={ref}
        className={`text-gray-12 border-none outline-none ${className}`}
        {...inputProps}
      />
      {xButton && xVisible && <XIcon />}
      {...rightIcons ?? []}
    </div>
  );

  // <TextField.Root {...inputProps} ref={ref}>
  //   <TextField.Slot side="right" gap="2">
  //     <Box display={xVisible ? undefined : 'none'} asChild>
  //       <IconButton variant="ghost" size="1" onMouseDown={onMouseDown}>
  //         <XIcon />
  //       </IconButton>
  //     </Box>
  //     {children}
  //   </TextField.Slot>
  // </TextField.Root>;
}
