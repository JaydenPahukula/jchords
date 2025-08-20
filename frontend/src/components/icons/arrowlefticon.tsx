import { CustomIconSVG } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const ArrowLeftIcon = (props: IconProps) => (
  <CustomIconSVG {...props}>
    <polyline points="8,4 0,12 8,20"></polyline>
    <line x1="0" y1="12" x2="24" y2="12"></line>
  </CustomIconSVG>
);
