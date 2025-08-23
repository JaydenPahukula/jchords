import { CustomIconSVG } from 'src/components/ui/icons/util/customiconsvg';
import { FillableIconProps } from 'src/types/fillableiconprops';

export const UserIcon = (props: FillableIconProps) => (
  <CustomIconSVG {...props} fill={props.fill ?? true}>
    <circle cx="12" cy="6.5" r="5"></circle>
    <path d="M1 22V21A11 6 0 0123 21V22A2 2 0 0121 24H3A2 2 0 011 22"></path>
  </CustomIconSVG>
);
