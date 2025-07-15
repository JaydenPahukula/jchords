import { CustomIcon } from 'src/components/icons/customicon';
import { IconProps } from 'src/types/iconprops';

export const UploadIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <line x1="3" y1="22" x2="21" y2="22"></line>
    <line x1="12" y1="16" x2="12" y2="2"></line>
    <polyline points="5,9 12,2 19,9"></polyline>
  </CustomIcon>
);
