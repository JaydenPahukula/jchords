import { CustomIconSVG } from 'src/components/icons/util/customiconsvg';
import { FillableIconProps } from 'src/types/fillableiconprops';

export const HomeIcon = (props: FillableIconProps) => (
  <CustomIconSVG {...props}>
    <polyline points="12,2 24,13 20,13 20,23 15,23 15,15 9,15 9,23 4,23 4,13 0,13 12,2"></polyline>
  </CustomIconSVG>
);
