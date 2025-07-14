import { Box, IconButton, Popover } from '@radix-ui/themes';
import { ReactElement } from 'react';

interface HeaderIconButtonProps {
  children?: ReactElement;
  menu: ReactElement;
}

export function HeaderIconButton(props: HeaderIconButtonProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton className="song-header-icon-button" size="3">
          <Box height="34px" width="34px" asChild>
            {props.children}
          </Box>
        </IconButton>
      </Popover.Trigger>
      <Popover.Content asChild>{props.menu}</Popover.Content>
    </Popover.Root>
  );
}

interface HeaderIconLinkProps {
  children?: ReactElement;
  href: string;
}

export function HeaderIconLink(props: HeaderIconLinkProps) {
  return (
    <IconButton className="song-header-icon-button" size="3" asChild>
      <a href={props.href}>
        <Box height="34px" width="34px" asChild>
          {props.children}
        </Box>
      </a>
    </IconButton>
  );
}
