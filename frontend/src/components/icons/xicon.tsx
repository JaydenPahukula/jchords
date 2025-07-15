import { CustomIcon } from 'src/components/icons/customicon';
import { IconProps } from 'src/types/iconprops';

export const XIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <line x1="4" y1="4" x2="20" y2="20"></line>
    <line x1="4" y1="20" x2="20" y2="4"></line>
  </CustomIcon>
);
