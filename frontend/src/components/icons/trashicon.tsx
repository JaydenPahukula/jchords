import { IconProps } from 'shared/types/iconprops';
import { CustomIcon } from 'src/components/icons/customicon';

export const TrashIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <path d="M19 5 18 19A3 3 0 0115 22H9A3 3 0 016 19L5 5M3 5H21M17 5 16.5 4A4 4 0 0013 2H11A4 4 0 007.5 4L7 5M14.5 9 14 18M9.5 9 10 18" />
  </CustomIcon>
);
