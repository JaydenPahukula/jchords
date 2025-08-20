import { CustomIcon } from 'src/components/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const TrashIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <path d="M21 4 19 21A3 4 0 0116 24H8A3 4 0 015 21L3 4M1 4H23M18 4 17.5 3A5 7 0 0013 0H11A4 4 0 006.5 3L6 4M15 9 14.5 19M9 9 9.5 19" />
  </CustomIcon>
);
