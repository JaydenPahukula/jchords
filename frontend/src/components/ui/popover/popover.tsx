import { Popover as RadixPopover } from 'radix-ui';
import { useRef } from 'react';

type PopoverContentProps = Omit<RadixPopover.PopoverContentProps, 'asChild'>;

function PopoverContent({ className, children, ...props }: PopoverContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        arrowPadding={24}
        collisionPadding={8}
        {...props}
        className={'my-popover ' + className}
      >
        <RadixPopover.Arrow height="8" width="16" className="fill-gray-1 visible" />
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}

export const Popover = {
  Root: RadixPopover.Root,
  Trigger: RadixPopover.Trigger,
  Content: PopoverContent,
  Close: RadixPopover.Close,
};
