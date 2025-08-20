import { CustomIcon } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const XIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <line x1="0" y1="0" x2="24" y2="24"></line>
    <line x1="0" y1="24" x2="24" y2="0"></line>
  </CustomIcon>
);
