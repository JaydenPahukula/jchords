import { CustomIconSVG } from 'src/components/ui/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const MagnifyingGlassIcon = (props: IconProps) => (
  <CustomIconSVG {...props}>
    <circle cx="8.5" cy="8.5" r="8.5"></circle>
    <line x1="15" y1="15" x2="24" y2="24"></line>
  </CustomIconSVG>
);
