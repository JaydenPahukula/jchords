import { CustomIconSVG } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const XIcon = (props: IconProps) => (
  <CustomIconSVG {...props}>
    <line x1="1" y1="1" x2="23" y2="23"></line>
    <line x1="1" y1="23" x2="23" y2="1"></line>
  </CustomIconSVG>
);
