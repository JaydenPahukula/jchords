import { ReactElement } from 'react';
import { Button, ButtonProps } from 'src/components/ui/button/button';

export type IconButtonProps = ButtonProps & {
  children?: ReactElement;
};

export function IconButton(props: IconButtonProps) {
  return <Button {...props} className={'my-icon-button ' + (props.className ?? '')} />;
}
