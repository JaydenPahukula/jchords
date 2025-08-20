import { CustomIcon } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const MagnifyingGlassPlusIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <circle cx="8.5" cy="8.5" r="8.5"></circle>
    <line x1="15" y1="15" x2="24" y2="24"></line>
    <line x1="8.5" y1="5" x2="8.5" y2="12"></line>
    <line x1="5" y1="8.5" x2="12" y2="8.5"></line>
  </CustomIcon>
);
