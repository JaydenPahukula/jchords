import { CustomIconSVG } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const UploadIcon = (props: IconProps) => (
  <CustomIconSVG {...props}>
    <line x1="2" y1="24" x2="22" y2="24"></line>
    <line x1="12" y1="17" x2="12" y2="0"></line>
    <polyline points="4,8 12,0 20,8"></polyline>
  </CustomIconSVG>
);
