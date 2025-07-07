import { useSignal } from '@preact/signals-react';
import { Box, IconButton, TextField } from '@radix-ui/themes';
import { MouseEvent, RefAttributes, useEffect, useRef } from 'react';
import { XIcon } from 'src/components/icons/xicon';

interface TextFieldWithXProps extends TextField.RootProps, RefAttributes<HTMLInputElement> {
  onXClicked?: () => void;
}

export function TextFieldWithX(props: TextFieldWithXProps) {
  const focused = useSignal(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { onXClicked, children, ...inputProps } = props;

  useEffect(() => {
    const onFocusHandler = () => (focused.value = true);
    const onBlurHandler = () => (focused.value = false);
    inputRef.current?.addEventListener('focus', onFocusHandler);
    inputRef.current?.addEventListener('blur', onBlurHandler);
    return () => {
      inputRef.current?.removeEventListener('focus', onFocusHandler);
      inputRef.current?.removeEventListener('blur', onBlurHandler);
    };
  }, []);

  const xVisible = focused.value && inputProps.value !== '';

  function onMouseDown(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (onXClicked !== undefined) onXClicked();
  }

  return (
    <TextField.Root {...inputProps} ref={inputRef}>
      <TextField.Slot side="right" gap="2">
        <Box display={xVisible ? undefined : 'none'} asChild>
          <IconButton variant="ghost" size="1" onMouseDown={onMouseDown}>
            <XIcon />
          </IconButton>
        </Box>
        {children}
      </TextField.Slot>
    </TextField.Root>
  );
}
