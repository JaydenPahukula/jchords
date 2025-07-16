import { CustomIcon } from 'src/components/icons/customicon';
import { IconProps } from 'src/types/iconprops';

export const ZoomIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <circle cx="10" cy="10" r="6" />
    <line x1="14.2" y1="14.2" x2="20" y2="20" />
    <line x1="10" y1="7.5" x2="10" y2="12.5" />
    <line x1="7.5" y1="10" x2="12.5" y2="10" />
  </CustomIcon>
);
