import { CustomIconSVG } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export function SignOutIcon(props: IconProps) {
  return (
    <CustomIconSVG {...props}>
      <path d="M10 8V6A4 4 0 0114 2H20A4 4 0 0124 6V18A4 4 0 0120 22H14A4 4 0 0110 18V16M18 12H0L4 8M0 12 4 16"></path>
    </CustomIconSVG>
  );
}
