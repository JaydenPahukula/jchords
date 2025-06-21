import { CustomIcon } from 'shared/components/icons/customicon';
import { IconProps } from 'shared/types/iconprops';

export const OpenFolderIcon = (props: IconProps) => (
  <CustomIcon {...props}>
    <path d="M1 20 5 8H23L19 20H1V4A1 1 0 012 3H7A1 1 0 018 4 1 1 0 009 5H18A1 1 0 0119 6V8"></path>
  </CustomIcon>
);
