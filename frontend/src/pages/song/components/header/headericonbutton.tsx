import { IconButton, IconProps, Popover } from '@radix-ui/themes';
import { FunctionComponent, ReactElement } from 'react';
import { Link } from 'react-router';

interface HeaderIconButtonProps {
  icon: FunctionComponent<IconProps>;
  menu: ReactElement;
}

export function HeaderIconButton(props: HeaderIconButtonProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton className="song-header-icon-button" size="3">
          <props.icon height="34px" width="34px" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content>{props.menu}</Popover.Content>
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
      <Link to={props.href}>
        <props.icon height="34px" width="34px" />
      </Link>
    </IconButton>
  );
}
