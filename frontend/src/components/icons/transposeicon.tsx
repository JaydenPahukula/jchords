import { CustomIcon } from 'src/components/icons/customicon';
import { IconProps } from 'src/types/iconprops';

export const TransposeIcon = (props: IconProps) => (
  <CustomIcon viewBox="-6 -4 27 29" {...props}>
    <path
      fill="currentColor"
      strokeWidth="1.2"
      d="M15.915 6.702a6.249 6.249 0 0 0-.77-.45h.01A3.612 3.612 0 0 1 13 3.026V2.5h-1v13.96a3.965 3.965 0 0 0-2.508-.417C7.562 16.3 5.996 17.61 6 18.963s1.578 2.249 3.508 1.993c1.867-.246 3.38-1.481 3.474-2.788H13V6.996a5.411 5.411 0 0 1 2.159.703 6.036 6.036 0 0 1 2.176 2.15 6.365 6.365 0 0 1 .25 5.94l.481.211a6.982 6.982 0 0 0-2.15-9.298z"
    />
    <path strokeWidth="2.2" d="M-3 5 0 2 3 5M0 2V21M-3 18 0 21 3 18" />
  </CustomIcon>
);
