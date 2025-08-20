import { ReactNode } from 'react';
import { IconProps } from 'src/types/iconprops';

interface CustomIconProps extends IconProps {
  children: ReactNode;
  className?: string;
  viewBox?: string;
  fill?: boolean;
  stroke?: boolean;
}

export function CustomIcon({
  children,
  className,
  viewBox = '-1 -1 26 26',
  // viewBox = '-2 -2 28 28',
  fill = false,
  stroke = true,
}: CustomIconProps) {
  return (
    <svg
      className={`inline-block h-4 w-4 hover:outline-1 ${className}`}
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
