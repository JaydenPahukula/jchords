import { ReactNode } from 'react';
import { IconProps } from 'src/types/iconprops';

interface CustomIconProps extends IconProps {
  children: ReactNode;
  className?: string;
  viewBox?: string;
  fill?: boolean;
  stroke?: boolean;
}

export function CustomIconSVG({
  children,
  className,
  viewBox = '-2 -2 28 28',
  fill = false,
  stroke = true,
}: CustomIconProps) {
  return (
    <svg
      className={`my-icon ${className}`}
      viewBox={viewBox}
      fill={fill ? 'currentColor' : 'none'}
      stroke={stroke ? 'currentColor' : 'none'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
