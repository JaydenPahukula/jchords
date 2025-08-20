import { FunctionComponent } from 'react';
import { Button, ButtonProps } from 'src/components/ui/button';
import { IconProps } from 'src/types/iconprops';

interface IconButtonProps extends Omit<ButtonProps, 'child'> {
  icon: FunctionComponent<IconProps>;
}

export function IconButton({ icon: Icon, ...buttonProps }: IconButtonProps) {
  return (
    <Button {...buttonProps}>
      <Icon />
    </Button>
  );
}
