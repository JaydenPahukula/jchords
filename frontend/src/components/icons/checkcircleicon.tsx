import { IconProps } from '@radix-ui/themes';
import { CustomIconSVG } from 'src/components/icons/util/customiconsvg';

export const CheckCircleIcon = (props: IconProps) => (
  <CustomIconSVG {...props}>
    <circle cx="12" cy="12" r="12" />
    <polyline points="18,9 10,17 6,13" />
  </CustomIconSVG>
);
