import { CustomIcon } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const PlayIcon = (props: IconProps) => (
  <CustomIcon {...props} fill>
    <polygon points="2,0 23,12 2,24"></polygon>
  </CustomIcon>
);
