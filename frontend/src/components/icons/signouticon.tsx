import { CustomIcon } from 'src/components/icons/customicon';
import { IconProps } from 'src/types/iconprops';

export function SignOutIcon(props: IconProps) {
  return (
    <CustomIcon {...props}>
      <path d="M11 8V6A3 3 0 0114 3H18A3 3 0 0121 6V18A3 3 0 0118 21H14A3 3 0 0111 18V16M17 12H3L7 8M3 12 7 16"></path>
    </CustomIcon>
  );
}
