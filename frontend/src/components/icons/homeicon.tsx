import { IconProps } from 'shared/types/iconprops';
import { CustomIcon } from 'src/components/icons/customicon';

export const HomeIcon = (props: IconProps) => (
  <CustomIcon
    viewBox="0 1 24 23"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    <path d="M6.5 20V11H3L12 5L21 11H17.5V20H14.5V16.5C14.5 15.6716 13.8284 15 13 15H11C10.1716 15 9.5 15.6716 9.5 16.5V20H6.5Z"></path>
  </CustomIcon>
);
