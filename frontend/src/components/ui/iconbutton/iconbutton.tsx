import { FunctionComponent } from 'react';
import { Button, ButtonProps } from 'src/components/ui/button/button';
import { IconProps } from 'src/types/iconprops';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: FunctionComponent<IconProps>;
}

export function IconButton({ icon: Icon, className, ...buttonProps }: IconButtonProps) {
  return (
    // @ts-expect-error see button.tsx
    <Button {...buttonProps} className={'my-icon-button ' + className}>
      <Icon />
    </Button>
  );
}
