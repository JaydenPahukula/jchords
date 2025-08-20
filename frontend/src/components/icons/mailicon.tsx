import { CustomIcon } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const MailIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <path d="M3 3H21A3 3 0 0124 6V18A3 3 0 0121 21H3A3 3 0 010 18V6A3 3 0 013 3"></path>
    <path d="M0 7 9 14A5 5 0 0015 14L24 7"></path>
  </CustomIcon>
);
