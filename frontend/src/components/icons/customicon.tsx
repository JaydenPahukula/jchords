import { ReactNode } from 'react';
import { IconProps } from 'shared/types/iconprops';

interface CustomIconProps extends IconProps {
  children?: ReactNode;
}

export function CustomIcon(props: CustomIconProps) {
  return (
    <svg
      className="icon"
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ color: props.color }}
    >
      {props.children}
    </svg>
  );
}
