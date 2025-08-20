import { CustomIcon } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const LockIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <rect x="3" y="9" width="18" height="15" rx="2" ry="2"></rect>
    <line x1="12" y1="15.5" x2="12" y2="19"></line>
    <circle fill="currentColor" cx="12" cy="15.5" r="1"></circle>
    <path d="M7 9V5A5 5 0 0 1 17 5V9"></path>
  </CustomIcon>
);
