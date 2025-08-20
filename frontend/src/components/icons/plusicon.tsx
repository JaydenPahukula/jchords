import { CustomIcon } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const PlusIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <line x1="0" y1="12" x2="24" y2="12"></line>
    <line x1="12" y1="0" x2="12" y2="24"></line>
  </CustomIcon>
);
