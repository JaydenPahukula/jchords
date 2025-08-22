import { CustomIconSVG } from 'src/components/ui/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const PlusCircleIcon = (props: IconProps) => (
  <CustomIconSVG {...props}>
    <circle cx="12" cy="12" r="12"></circle>
    <line x1="6" y1="12" x2="18" y2="12"></line>
    <line x1="12" y1="6" x2="12" y2="18"></line>
  </CustomIconSVG>
);
