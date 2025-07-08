import { IconButton, IconProps, Popover } from '@radix-ui/themes';
import { FunctionComponent, ReactElement } from 'react';

interface HeaderIconButtonProps {
  icon: FunctionComponent<IconProps>;
  menu: ReactElement;
}

export function HeaderIconButton(props: HeaderIconButtonProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton>
          <props.icon height="34px" width="34px" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content asChild>{props.menu}</Popover.Content>
    </Popover.Root>
  );
}

interface HeaderIconLinkProps {
  icon: FunctionComponent<IconProps>;
  href: string;
}

export function HeaderIconLink(props: HeaderIconLinkProps) {
  return (
    <IconButton className="song-header-icon-button" size="3" asChild>
      <a href={props.href}>
        <props.icon height="34px" width="34px" />
      </a>
    </IconButton>
  );
}
