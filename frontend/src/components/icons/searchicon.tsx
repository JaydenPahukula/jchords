import { IconProps } from 'shared/types/iconprops';
import { CustomIcon } from 'src/components/icons/customicon';

export const SearchIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <circle cx="9" cy="9" r="8"></circle>
    <line x1="15.3" y1="15.3" x2="22" y2="22"></line>
  </CustomIcon>
);
