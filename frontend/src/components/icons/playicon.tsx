import { CustomIcon } from 'src/components/icons/customicon';
import { IconProps } from 'src/types/iconprops';

export const PlayIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <circle stroke="currentColor" fill="none" cx="12" cy="12" r="11"></circle>
    <polygon stroke="none" fill="currentColor" points="9,6.5 17.5,12 9,17.5"></polygon>
  </CustomIcon>
);
