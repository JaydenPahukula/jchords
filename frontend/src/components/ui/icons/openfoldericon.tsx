import { CustomIconSVG } from 'src/components/ui/icons/util/customiconsvg';
import { IconProps } from 'src/types/iconprops';

export const OpenFolderIcon = (props: IconProps) => (
  <CustomIconSVG {...props}>
    <path d="M1 20 5 8H24L20 20H1L0 4A1 1 0 011 3H7A1 1 0 018 4 1 1 0 009 5H18A1 1 0 0119 6L19.2 8"></path>
  </CustomIconSVG>
);
