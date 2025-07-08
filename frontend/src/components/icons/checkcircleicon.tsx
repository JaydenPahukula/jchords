import { IconProps } from '@radix-ui/themes';
import { CustomIcon } from 'src/components/icons/customicon';

export const CheckCircleIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M17 9L10 16L7 13" />
  </CustomIcon>
);
