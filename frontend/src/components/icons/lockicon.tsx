import { IconProps } from 'shared/types/iconprops';
import { CustomIcon } from 'src/components/icons/customicon';

export const LockIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <rect x="4" y="10" width="16" height="13" rx="2" ry="2"></rect>
    <line x1="12" y1="15.5" x2="12" y2="17.5"></line>
    <path d="M7 10V4A6 6 0 0 1 17 4V10"></path>
  </CustomIcon>
);
