import { IconProps } from 'shared/types/iconprops';
import { CustomIcon } from 'src/components/icons/customicon';

export const PlusCircleIcon = (props: IconProps) => (
  <CustomIcon viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="11"></circle>
    <line x1="7" y1="12" x2="17" y2="12"></line>
    <line x1="12" y1="7" x2="12" y2="17"></line>
  </CustomIcon>
);
