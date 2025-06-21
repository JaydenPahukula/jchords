import { CustomIcon } from 'shared/components/icons/customicon';
import { IconProps } from 'shared/types/iconprops';

export const ArrowLeftIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <polyline points="9 4 1 12 9 20"></polyline>
    <line x1="1" y1="12" x2="23" y2="12"></line>
  </CustomIcon>
);
