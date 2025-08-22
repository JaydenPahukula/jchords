import { CustomIconSVG } from 'src/components/ui/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const SaveIcon = (props: IconProps) => (
  <CustomIconSVG {...props}>
    <path d="M1 4V20A4 4 0 005 24H19A4 4 0 0023 20V6L17 0H5A4 4 0 001 4M8 0V5A2 2 0 0010 7H14A2 2 0 0016 5V0M7 24V16A2 2 0 019 14H15A2 2 0 0117 16V24"></path>
  </CustomIconSVG>
);
