import { ReactNode, SVGProps } from 'react';

interface CustomIconProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
  className?: string;
}

export function CustomIcon(props: CustomIconProps) {
  const { children, className, ...svgProps } = props;
  return (
    <svg
      className={`inline-block h-4 w-4 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      {children}
    </svg>
  );
}
