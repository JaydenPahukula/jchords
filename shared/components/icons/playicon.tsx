import { CustomIcon } from 'shared/components/icons/customicon';
import { IconProps } from 'shared/types/iconprops';

export const PlayIcon = (props: IconProps) => (
  <CustomIcon fill="currentColor" stroke="none" {...props}>
    <circle stroke="currentColor" stroke-width="2" fill="none" cx="12" cy="12" r="11"></circle>
    <polygon stroke="none" fill="currentColor" points="9,6.5 17.5,12 9,17.5"></polygon>
  </CustomIcon>
);
